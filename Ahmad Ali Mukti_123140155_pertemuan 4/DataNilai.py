# Kelas utama untuk mengelola data nilai mahasiswa
class ManajemenNilai:
    def __init__(self):
        """
        Inisialisasi kelas ManajemenNilai
        Membuat data awal dengan 5 mahasiswa sebagai contoh
        Data setiap mahasiswa terdiri dari:
        - nama: nama lengkap mahasiswa
        - NIM: Nomor Induk Mahasiswa
        - nilai_uts: nilai Ujian Tengah Semester (0-100)
        - nilai_uas: nilai Ujian Akhir Semester (0-100)
        - nilai_tugas: nilai Tugas (0-100)
        """
        self.data_mahasiswa = [
            {"nama": "Ahmad Ali", "NIM": "123140155", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
            {"nama": "Budi Santoso", "NIM": "123140156", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 85},
            {"nama": "Citra Dewi", "NIM": "123140157", "nilai_uts": 90, "nilai_uas": 85, "nilai_tugas": 92},
            {"nama": "Dian Purnama", "NIM": "123140158", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
            {"nama": "Eko Prasetyo", "NIM": "123140159", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 78}
        ]

    def hitung_nilai_akhir(self, uts, uas, tugas):
        """
        Menghitung nilai akhir mahasiswa berdasarkan bobot:
        - 30% dari nilai UTS
        - 40% dari nilai UAS
        - 30% dari nilai Tugas
        
        Parameters:
            uts (float): nilai UTS (0-100)
            uas (float): nilai UAS (0-100)
            tugas (float): nilai Tugas (0-100)
        
        Returns:
            float: nilai akhir (0-100)
        """
        return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

    def tentukan_grade(self, nilai_akhir):
        """
        Menentukan grade berdasarkan nilai akhir
        
        Kriteria:
        - A: >= 80
        - B: >= 70
        - C: >= 60
        - D: >= 50
        - E: < 50
        
        Parameters:
            nilai_akhir (float): nilai akhir mahasiswa (0-100)
        
        Returns:
            str: grade (A/B/C/D/E)
        """
        if nilai_akhir >= 80:
            return 'A'
        elif nilai_akhir >= 70:
            return 'B'
        elif nilai_akhir >= 60:
            return 'C'
        elif nilai_akhir >= 50:
            return 'D'
        else:
            return 'E'

    def tampilkan_data(self):
        """
        Menampilkan data seluruh mahasiswa dalam format tabel
        Informasi yang ditampilkan:
        - Nomor urut
        - Nama mahasiswa
        - NIM
        - Nilai UTS
        - Nilai UAS
        - Nilai Tugas
        - Nilai Akhir (hasil perhitungan)
        - Grade (A/B/C/D/E)
        """
        print("\n" + "="*100)
        print(f"{'NO':4} {'NAMA':20} {'NIM':12} {'UTS':6} {'UAS':6} {'TUGAS':7} {'NILAI AKHIR':12} {'GRADE':6}")
        print("="*100)
        
        for idx, mhs in enumerate(self.data_mahasiswa, 1):
            nilai_akhir = self.hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
            grade = self.tentukan_grade(nilai_akhir)
            print(f"{idx:4} {mhs['nama']:20} {mhs['NIM']:12} {mhs['nilai_uts']:6} {mhs['nilai_uas']:6} "
                  f"{mhs['nilai_tugas']:7} {nilai_akhir:12.2f} {grade:6}")
        print("="*100)

    def cari_nilai_ekstrem(self):
        """
        Mencari dan menampilkan informasi mahasiswa dengan:
        1. Nilai tertinggi dalam kelas
        2. Nilai terendah dalam kelas
        
        Perhitungan berdasarkan nilai akhir (bukan nilai individual UTS/UAS/Tugas)
        Output berupa nama mahasiswa dan nilai akhirnya
        """
        nilai_akhir_list = [(mhs['nama'], self.hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']))
                           for mhs in self.data_mahasiswa]
        
        tertinggi = max(nilai_akhir_list, key=lambda x: x[1])
        terendah = min(nilai_akhir_list, key=lambda x: x[1])
        
        print("\nNilai Tertinggi:")
        print(f"Nama: {tertinggi[0]}, Nilai: {tertinggi[1]:.2f}")
        print("\nNilai Terendah:")
        print(f"Nama: {terendah[0]}, Nilai: {terendah[1]:.2f}")

    def input_mahasiswa_baru(self):
        """
        Fungsi untuk menambahkan data mahasiswa baru ke dalam sistem
        
        Meminta input:
        - Nama mahasiswa
        - NIM
        - Nilai UTS (0-100)
        - Nilai UAS (0-100)
        - Nilai Tugas (0-100)
        
        Validasi:
        - Semua nilai harus dalam rentang 0-100
        - Input nilai harus berupa angka
        - Tidak boleh ada data yang kosong
        """
        print("\nInput Data Mahasiswa Baru")
        try:
            nama = input("Nama: ")
            nim = input("NIM: ")
            nilai_uts = float(input("Nilai UTS: "))
            nilai_uas = float(input("Nilai UAS: "))
            nilai_tugas = float(input("Nilai Tugas: "))

            # Validasi nilai
            if not all(0 <= nilai <= 100 for nilai in [nilai_uts, nilai_uas, nilai_tugas]):
                print("Error: Nilai harus berada dalam rentang 0-100")
                return

            mahasiswa_baru = {
                "nama": nama,
                "NIM": nim,
                "nilai_uts": nilai_uts,
                "nilai_uas": nilai_uas,
                "nilai_tugas": nilai_tugas
            }
            self.data_mahasiswa.append(mahasiswa_baru)
            print("Data mahasiswa berhasil ditambahkan!")
        except ValueError:
            print("Error: Masukan tidak valid!")

    def filter_by_grade(self, grade):
        """
        Mencari dan menampilkan daftar mahasiswa dengan grade tertentu
        
        Parameters:
            grade (str): Grade yang ingin dicari (A/B/C/D/E)
        
        Output:
        - Daftar mahasiswa dengan grade yang sesuai
        - Informasi yang ditampilkan: nama, NIM, nilai akhir, dan grade
        - Pesan khusus jika tidak ada mahasiswa dengan grade tersebut
        """
        filtered_data = []
        for mhs in self.data_mahasiswa:
            nilai_akhir = self.hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
            if self.tentukan_grade(nilai_akhir) == grade.upper():
                filtered_data.append(mhs)
        
        if filtered_data:
            print(f"\nMahasiswa dengan Grade {grade.upper()}:")
            print("="*100)
            print(f"{'NAMA':20} {'NIM':12} {'NILAI AKHIR':12} {'GRADE':6}")
            print("="*100)
            for mhs in filtered_data:
                nilai_akhir = self.hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
                print(f"{mhs['nama']:20} {mhs['NIM']:12} {nilai_akhir:12.2f} {grade.upper():6}")
            print("="*100)
        else:
            print(f"\nTidak ada mahasiswa dengan grade {grade.upper()}")

    def hitung_rata_rata_kelas(self):
        """
        Menghitung dan menampilkan statistik nilai kelas:
        1. Rata-rata nilai akhir seluruh mahasiswa
        2. Grade yang sesuai dengan nilai rata-rata tersebut
        
        Perhitungan:
        - Menggunakan nilai akhir setiap mahasiswa
        - Jika tidak ada data mahasiswa, rata-rata = 0
        """
        if not self.data_mahasiswa:
            return 0
        
        total_nilai_akhir = sum(self.hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
                               for mhs in self.data_mahasiswa)
        rata_rata = total_nilai_akhir / len(self.data_mahasiswa)
        
        print(f"\nRata-rata nilai kelas: {rata_rata:.2f}")
        print(f"Grade rata-rata kelas: {self.tentukan_grade(rata_rata)}")

# Fungsi utama program
def main():
    """
    Fungsi utama yang menjalankan program manajemen nilai
    Menyediakan menu interaktif dengan pilihan:
    1. Tampilkan Data Mahasiswa
    2. Input Mahasiswa Baru
    3. Cari Nilai Tertinggi/Terendah
    4. Filter Berdasarkan Grade
    5. Hitung Rata-rata Kelas
    6. Keluar
    """
    manajemen = ManajemenNilai()
    
    while True:
        print("\nMenu Manajemen Nilai Mahasiswa:")
        print("1. Tampilkan Data Mahasiswa")
        print("2. Input Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi/Terendah")
        print("4. Filter Berdasarkan Grade")
        print("5. Hitung Rata-rata Kelas")
        print("6. Keluar")
        
        pilihan = input("\nPilih menu (1-6): ")
        
        if pilihan == '1':
            manajemen.tampilkan_data()
        elif pilihan == '2':
            manajemen.input_mahasiswa_baru()
        elif pilihan == '3':
            manajemen.cari_nilai_ekstrem()
        elif pilihan == '4':
            grade = input("Masukkan grade yang dicari (A/B/C/D/E): ")
            manajemen.filter_by_grade(grade)
        elif pilihan == '5':
            manajemen.hitung_rata_rata_kelas()
        elif pilihan == '6':
            print("\nTerima kasih telah menggunakan program ini!")
            break
        else:
            print("\nPilihan tidak valid!")

if __name__ == "__main__":
    main()
