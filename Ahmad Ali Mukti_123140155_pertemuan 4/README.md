# Sistem Manajemen Nilai Mahasiswa

## Identitas Pengembang

| Nama | NIM |
|------|-----|
| Ahmad Ali Mukti | 123140155 |

## Deskripsi Program
Program ini adalah sistem manajemen nilai mahasiswa yang ditulis dalam bahasa Python. Program ini memungkinkan pengguna untuk mengelola data nilai mahasiswa dengan berbagai fitur lengkap seperti perhitungan nilai akhir, penentuan grade, dan analisis statistik kelas.

## Fitur Program
1. **Manajemen Data Mahasiswa**
   - Menyimpan data mahasiswa (Nama, NIM)
   - Menyimpan nilai (UTS, UAS, Tugas)
   - Menampilkan data dalam format tabel

2. **Perhitungan Nilai**
   - Nilai Akhir = 30% UTS + 40% UAS + 30% Tugas
   - Penentuan Grade:
     * A: ≥80
     * B: ≥70
     * C: ≥60
     * D: ≥50
     * E: <50

3. **Fitur Analisis**
   - Pencarian nilai tertinggi dan terendah
   - Filter mahasiswa berdasarkan grade
   - Perhitungan rata-rata kelas

4. **Fitur Input/Output**
   - Input data mahasiswa baru
   - Validasi input nilai (0-100)
   - Tampilan hasil dalam format tabel

## Cara Penggunaan
1. Jalankan program dengan perintah:
   ```
   python DataNilai.py
   ```

2. Pilih menu yang tersedia:
   - Menu 1: Tampilkan Data Mahasiswa
   - Menu 2: Input Mahasiswa Baru
   - Menu 3: Cari Nilai Tertinggi/Terendah
   - Menu 4: Filter Berdasarkan Grade
   - Menu 5: Hitung Rata-rata Kelas
   - Menu 6: Keluar

## Struktur Data
Program menggunakan struktur data berikut:
```python
{
    "nama": str,        # Nama mahasiswa
    "NIM": str,         # Nomor Induk Mahasiswa
    "nilai_uts": float, # Nilai UTS (0-100)
    "nilai_uas": float, # Nilai UAS (0-100)
    "nilai_tugas": float # Nilai Tugas (0-100)
}
```

## Validasi Input
- Semua nilai harus dalam rentang 0-100
- Input nilai harus berupa angka
- Tidak boleh ada data yang kosong
- Format NIM dan nama harus sesuai

## Kebutuhan Sistem
- Python 3.x
- Terminal/Command Prompt
- Sistem Operasi: Windows/Linux/MacOS

## Catatan Pengembangan
- Program menggunakan pendekatan Object-Oriented Programming (OOP)
- Dokumentasi lengkap tersedia dalam kode sumber
- Validasi input untuk mencegah kesalahan data
- Interface berbasis terminal yang mudah digunakan