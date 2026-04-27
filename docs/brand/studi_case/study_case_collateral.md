# Studi Kasus UX + Arsitektur: “Draft Jaminan Sudah Diisi, Tapi Lupa Klik ‘Tambah Jaminan’”

## Ringkasnya
Di form pengajuan pembiayaan, user bisa mengisi **draft jaminan** (nama, nilai taksiran, foto). Tapi draft itu **baru dihitung**
kalau user menekan tombol **“Tambah Jaminan”**. Banyak user mengira “isi form = otomatis tersimpan”, lalu langsung klik
**Lanjut** dan data jaminan tidak masuk.

Solusi yang kita pakai:
1) **Validasi** saat user klik Lanjut: jika ada draft jaminan yang sudah terisi tapi belum ditambahkan, **blok lanjut**.
2) Beri **haptic feedback (getar)** + tombol **“Tambah Jaminan”** diberi animasi **shake**, dan otomatis scroll/expand ke section
   jaminan.
3) Aksi-aksi “one-shot” itu kita jalankan lewat **Effect** sesuai `docs/technical/ui_state_architecture.md`.

  ---

## 1) Konteks dan masalah
### Kondisi awal
- Di section jaminan, user mengisi form jaminan.
- Tombol **Tambah Jaminan** berfungsi untuk memindahkan draft menjadi “daftar jaminan” (summary) yang benar-benar dipakai untuk
  perhitungan/payload.
- Kalau user klik **Lanjut** tanpa menekan Tambah Jaminan, draft itu tidak ikut dihitung.

### Dampak
- UX membingungkan (“Saya sudah isi kok, kenapa tidak masuk?”)
- Risiko data pengajuan tidak lengkap.
- Tim support sering menerima pertanyaan yang sama.

  ---

## 2) Target perbaikan UX
Saat user klik **Lanjut**:
- Jika masih ada draft jaminan yang sudah terisi (dirty) tapi belum “ditambahkan”:
    - Jangan pindah step.
    - Beri feedback yang jelas:
        - getar perangkat (haptic)
        - tombol “Tambah Jaminan” shake
        - scroll/expand ke bagian jaminan
    - Beri pesan validasi: “Tekan ‘Tambah Jaminan’ terlebih dahulu.”

  ---

## 3) Kenapa pakai “Effect” (bukan State)?
Mengacu `docs/technical/ui_state_architecture.md`:
- **State** adalah snapshot UI yang stabil dan bisa direbuild berkali-kali.
- **Effect** adalah aksi “sekali tembak” (one-shot) seperti:
    - snackbar
    - navigasi
    - haptic feedback
    - trigger animasi sesaat

Kalau kita taruh haptic/animasi di State, ada risiko:
- efek ke-trigger ulang saat rebuild
- lebih sulit mengontrol “sekali saja per event”

Jadi untuk kasus “klik Lanjut → getar + shake”, **Effect adalah pilihan yang pas**.

  ---

## 4) Desain solusi (high level)
Ada 3 bagian utama:

### A. Deteksi “draft jaminan masih nyangkut”
Kita definisikan draft dianggap “pending” kalau user sudah mengisi salah satu field (nama/desc/nilai/foto), tapi belum menekan
“Tambah Jaminan”.

Di implementasi ini, “pending” berbasis *dirty form* (bukan wajib valid). Ini bisa diubah sesuai kebijakan.

### B. Validasi saat klik Lanjut (di stepper/page)
Ketika user klik Lanjut pada step Data Pengajuan:
- kalau form loan valid **tapi** masih ada pending draft jaminan:
    - return `(false, message)`
    - emit effect untuk memicu perhatian user

### C. UI respons terhadap effect
Page yang menampilkan section jaminan:
- listen effect (pakai `ever`)
- jalankan:
    - `HapticFeedback.mediumImpact()`
    - expand section
    - scroll ke section
    - increment token agar tombol “Tambah Jaminan” shake

  ---

## 5) Cuplikan implementasi (inti saja)
> Catatan: nama file disesuaikan dengan repo.

### Effect: “minta user tambahkan jaminan”
`apps/bmt_mobile/lib/features/loan/subfeatures/applications/presentation/effects/loan_application_loan_data_effect.dart`
- `LoanApplicationLoanDataRequireAddCollateral`

### Controller: simpan flag + emit effect
`apps/bmt_mobile/lib/features/loan/subfeatures/applications/presentation/controllers/loan_application_loan_data_controller.dart`
- `bool hasPendingCollateralDraft`
- `requestAddCollateralAttention()`

### Validasi saat klik Lanjut
`apps/bmt_mobile/lib/features/loan/subfeatures/applications/presentation/pages/apply_loan_page.dart`
- di `_validateCurrentStep(_ApplyStep.loan)`:
    - kalau `ok && _loanDataController.hasPendingCollateralDraft`:
        - `_loanDataController.requestAddCollateralAttention()`
        - return false + message

### UI listen effect + haptic + scroll + trigger shake
`apps/bmt_mobile/lib/features/loan/subfeatures/applications/presentation/pages/content/loan_application_content.dart`
- `ever(_loanController.effect, ...)`
- `HapticFeedback.mediumImpact()`
- set expand + `Scrollable.ensureVisible(...)`
- `shakeToken++` untuk memicu animasi tombol

### Animasi shake tombol “Tambah Jaminan”
`apps/bmt_mobile/lib/features/loan/subfeatures/applications/presentation/widgets/application_content/collateral_section.dart`
- `AnimationController`
- `Transform.translate` dengan sin wave
- trigger tiap kali `shakeAddButtonToken` berubah

  ---

## 6) Trade-off & catatan teknis
1) **Dirty vs Valid**
    - Dirty lebih aman (mencegah “nyangkut” walau nilainya belum valid).
    - Tapi bisa terlalu ketat jika user baru mengetik 1 huruf lalu ingin batal.
      Opsi alternatif: blok hanya jika draft sudah “valid minimal” (nama + nilai > 0).

2) **Penempatan effect**
    - Idealnya effect dipicu oleh “step controller” (karena event-nya datang dari klik Lanjut).
    - Tapi tetap acceptable ditaruh di loan-data controller selama scope-nya jelas untuk screen itu.

3) **Aksesibilitas**
    - Haptic + shake bagus untuk perhatian, tapi jangan berlebihan.
    - Pastikan tetap ada message text yang jelas.

  ---

## 7) Cara test manual
1) Masuk step “Data Pengajuan”.
2) Isi draft jaminan (misalnya nama dan nilai).
3) Jangan tekan “Tambah Jaminan”.
4) Tekan “Lanjut”.
5) Expected:
    - tidak pindah step
    - ada haptic
    - otomatis scroll/expand section jaminan
    - tombol “Tambah Jaminan” shake
    - ada pesan error yang jelas

  ---

## Penutup
Studi kasus ini menunjukkan kombinasi yang efektif antara:
- **Validasi UX** (mencegah user kehilangan data tanpa sadar)
- **UI State Architecture** (state untuk rendering, effect untuk aksi sekali tembak)
- **Micro-interaction** (haptic + shake) untuk mengarahkan user tanpa harus “marah-marah” lewat teks
