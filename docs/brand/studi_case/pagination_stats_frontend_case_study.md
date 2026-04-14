# Case Study: Kalkulasi Statistik dari Data Paginated di Frontend

## Latar Belakang

Pada fitur **Riwayat Presensi**, backend menyediakan data paginated tanpa field ringkasan seperti
`total_present`/`total_absent`. UI membutuhkan angka **Hadir** dan **Bolos** untuk seluruh data,
bukan hanya 1 halaman.

Karena ringkasan belum tersedia di backend, statistik dihitung di frontend dengan cara
mengambil **semua page** secara bertahap.

---

## Tujuan

1. UI tetap bisa menampilkan daftar page-by-page (hemat bandwidth).
2. Statistik total tetap akurat untuk seluruh dataset.
3. Tidak ada “request hantu” ketika user berpindah siswa.

---

## Pola Implementasi (Best Practice di repo ini)

### 1) List utama tetap paginated

- Load data awal: `page=0&size=10`
- Scroll bawah → `loadNext()` append items ke state.

### 2) Statistik dihitung terpisah (background)

Setelah load pertama berhasil:

- Hitung cepat dari **page pertama** (agar UI langsung punya angka awal).
- Jalankan `_loadStats()` di background untuk ambil semua page (size lebih besar, mis. 100).

### 3) Guard untuk mencegah stale update

Karena `_loadStats()` berjalan lama, ketika user ganti siswa harus:

- **batalkan hasil lama** (tanpa mengubah domain layer).
- Gunakan **request token** untuk memastikan hanya request terbaru yang boleh update state.

Contoh pola:

```dart
final token = ++_requestToken;
final result = await usecase(...);
if (token != _requestToken) return; // ignore stale response
```

Token dicek **sebelum** dan **sesudah** setiap request page.

---

## Dampak & Trade-off

**Pro:**
- Data list tetap ringan.
- Statistik akurat, sekalipun data > 1 page.
- Bebas dari bug “request lama menimpa data baru”.

**Kontra:**
- Ada tambahan request di background untuk statistik.
- Jika user sering berpindah siswa, request stats sering dibatalkan.

---

## Rekomendasi

1. Jika memungkinkan, **minta backend** menyediakan ringkasan statistik agar lebih efisien.
2. Saat backend belum siap, gunakan pattern ini dengan **request token guard**.
3. Hindari membawa `CancelToken` ke domain layer (sesuai `domain_data_architecture.md`).

---

## Referensi

- `docs/engineering/ui_state_architecture.md`
- `docs/engineering/domain_data_architecture.md`
