# Studi Kasus: Menentukan Status Cicilan (Paid/Unpaid) dari `user_loans` + `mutations`

Dokumen ini ngebahas cara “nyocokin” jadwal cicilan dari endpoint **`/loans/user`** dengan transaksi pembayaran dari endpoint **mutation**, supaya UI bisa menandai cicilan mana yang **sudah dibayar** dan mana yang **belum**.

Bahasanya sengaja santai biar enak dibaca, tapi tetap rapi. Silakan copas/edit buat blog pribadi kamu.

---

## Masalahnya apa?

Di data `user_loans`, kita punya list `loan_repayments` (jadwal cicilan), tapi biasanya tidak ada flag `paid/unpaid`.

Sementara itu, endpoint mutation ngasih list transaksi. Nah transaksi yang relevan untuk cicilan adalah transaksi dengan:
- `trx_type = "repayment"`
- `trx_code` biasanya diawali `"PAY"` (opsional buat filter supaya lebih bersih)

Tujuan kita:
- Menentukan cicilan (berdasarkan `bill_sequence`) sudah lunas atau belum.
- Mengaktifkan parameter UI:
  - `PaymentHistoryItem(isPaid: ...)`
  - `VerticalStepWidget(isCompleted: ...)`

---

## Data yang dipakai

### 1) Dari `user_loans` (`/loans/user`)
Kita fokus ke `loan_repayments`:
- `bill_sequence` → nomor cicilan (1, 2, 3, ...)
- `repayment_per_tenure` → target nominal cicilan per tagihan

Ini adalah **jadwal/target**.

### 2) Dari mutation
Contoh field penting:
- `trx_type` → harus `"repayment"`
- `trx_code` → biasanya `"PAY..."` (opsional)
- `trx_cycle` → ini yang kita map ke `bill_sequence`
- `credit` → nominal yang dibayar (yang paling netral untuk penentuan lunas)

Ini adalah **pembayaran real**.

---

## Kunci pencocokan (mapping)

Aturan utama:
- mutation: `trx_cycle`
- jadwal: `bill_sequence`

Contoh:
- `trx_cycle = "1"` → cicilan dengan `bill_sequence = 1`

---

## Kenapa harus di-sum?

Karena 1 tagihan bisa dibayar lebih dari sekali (partial payment).

Misal ada 2 mutation yang sama-sama `trx_cycle = 1`:
- transaksi A credit 1000
- transaksi B credit 1167

Total pembayaran untuk cicilan ke-1 = `1000 + 1167 = 2167`.

Makanya kita bikin:
- `totalPaidByCycle[cycle] = sum(credit)`

**NB:** Untuk case yang dimobile untuk sementara user melakukan pembayaran full payment, tapi kita tetap bikin logika ini supaya aman untuk kemungkinan partial payment di masa depan.

---

## Aturan status “lunas”

Untuk tiap cicilan (`bill_sequence = N`):
- ambil `paidAmount = totalPaidByCycle[N]` (default 0)
- ambil `target = repayment_per_tenure`
- status:
  - `paid` kalau `paidAmount >= target`
  - `unpaid` kalau masih kurang

Catatan kecil:
- Biasanya aman pakai toleransi kecil untuk floating: `paidAmount + 0.01 >= target`.

---

## Pseudocode singkat

```text
mutations = fetchMutations()
repayments = loan.loanRepayments

payMutations = mutations
  .filter(trx_type == 'repayment')
  .filter(trx_code startsWith 'PAY') // optional

totalPaidByCycle = groupBy(payMutations, trx_cycle)
  .mapValues(sum(credit))

for repayment in repayments:
  cycle = repayment.bill_sequence
  paidAmount = totalPaidByCycle[cycle] ?? 0
  target = repayment.repayment_per_tenure ?? 0
  isPaid = paidAmount >= target - 0.01
```

---

## Implementasi di codebase (BMT Mobile)

Supaya sesuai pola `docs/technical/ui_state_architecture.md`, logic fetch + mapping **tidak** ditaruh di UI, tapi di controller + state.

### File yang terlibat

- Controller (orchestrator + mapping):
  - `apps/bmt_mobile/lib/features/loan/subfeatures/user_loans/presentation/controllers/user_loan_detail_controller.dart`
  - Di sini tempat:
    - fetch semua mutation repayment (paging) → `_fetchAllRepaymentMutations(...)`
    - alasan “kenapa harus di-sum” → `_sumPaidByBillSequence(...)`
    - penentuan status paid/unpaid → `_computePaidStatus(...)`
- State (snapshot finite untuk halaman detail):
  - `apps/bmt_mobile/lib/features/loan/subfeatures/user_loans/presentation/states/user_loan_detail_state.dart`
  - Contoh state: `Loading`, `Failure`, `Data`
- Binding (register dependencies untuk page detail):
  - `apps/bmt_mobile/lib/features/loan/subfeatures/user_loans/presentation/bindings/user_loan_detail_binding.dart`
  - Binding ini nyiapin dependency mutation (data source/repo/usecase) + `UserLoanDetailController`
- Routing hookup (binding dipasang ke route):
  - `apps/bmt_mobile/lib/navigation/loan/loan_pages.dart`
  - Route `LoanRoutes.loanDetail` pakai `UserLoanDetailBinding()`
- UI page (render dari 1 state, set `isPaid/isCompleted`):
  - `apps/bmt_mobile/lib/features/loan/subfeatures/user_loans/presentation/pages/loan_detail_page.dart`
  - Mapping UI:
    - `VerticalStepWidget(isCompleted: isPaid)`
    - `PaymentHistoryItem(isPaid: isPaid)`
- Skeleton/shimmer saat loading status mutation:
  - `apps/bmt_mobile/lib/features/loan/subfeatures/user_loans/presentation/widgets/skeleton/loan_detail_skeleton.dart`

### Alur singkatnya

1) User masuk `LoanDetailPage` bawa `UserLoanEntity` via `Get.arguments`.
2) `UserLoanDetailController.onInit()` auto `load(loan)`:
   - fetch mutation `trx_type = repayment`
   - group by `trx_cycle`, lalu `sum(credit)`
   - map ke `bill_sequence` dan hitung `isBillPaid`
3) UI cukup `Obx()` + `switch` state:
   - state Loading → tampil `LoanDetailSkeleton`
   - state Data → tampil jadwal + tanda lunas per cicilan

Bonus UX:
- “Tagihan berikutnya” dipilih dari cicilan pertama yang **belum lunas**.

---

## Kenapa pakai `credit` saja? Perlu `principal`/`margin`?

Untuk penentuan “lunas/belum”, **pakai `sum(credit)` saja sudah cukup** karena:
- `credit` merepresentasikan uang yang masuk (arus kas), paling netral.
- `principal`/`margin` lebih cocok buat informasi tambahan (breakdown), bukan sumber kebenaran status lunas.

Kalau suatu saat butuh detail, `principal` & `margin` bisa dipakai buat tampilan, tapi logika paid/unpaid tetap aman pakai `credit`.

---

## Edge case yang perlu diingat

- `trx_cycle` kadang string → parse ke `int`, kalau gagal skip.
- `credit` bisa string dari API → pastikan parsing aman (di model mutation sudah dilakukan).
- Kalau suatu saat backend mengubah relasi `trx_cycle` != `bill_sequence`, fallback mapping perlu tambahan (mis. pakai `due_date`), tapi itu case berbeda.
