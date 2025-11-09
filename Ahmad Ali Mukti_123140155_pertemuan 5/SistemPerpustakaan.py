from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


class LibraryItem(ABC):
    """
    Abstract class untuk semua item di perpustakaan.
    Menerapkan konsep abstraction dan menjadi base class untuk item perpustakaan.
    """
    
    def __init__(self, item_id: str, title: str, publisher: str, year: int):
        """
        Constructor untuk LibraryItem.
        
        Args:
            item_id: ID unik untuk item
            title: Judul item
            publisher: Penerbit item
            year: Tahun terbit
        """
        self._item_id = item_id  # Protected attribute
        self._title = title  # Protected attribute
        self._publisher = publisher  # Protected attribute
        self._year = year  # Protected attribute
        self.__is_available = True  # Private attribute untuk status ketersediaan
        self.__borrowed_date = None  # Private attribute untuk tanggal peminjaman
    
    # Property decorator untuk encapsulation
    @property
    def item_id(self) -> str:
        """Getter untuk item_id"""
        return self._item_id
    
    @property
    def title(self) -> str:
        """Getter untuk title"""
        return self._title
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self.__is_available
    
    @is_available.setter
    def is_available(self, value: bool):
        """Setter untuk status ketersediaan dengan validasi"""
        if not isinstance(value, bool):
            raise ValueError("Status ketersediaan harus berupa boolean")
        self.__is_available = value
        if value:
            self.__borrowed_date = None
        else:
            self.__borrowed_date = datetime.now()
    
    @abstractmethod
    def display_info(self) -> str:
        """
        Abstract method yang harus diimplementasikan oleh subclass.
        Mengembalikan informasi detail tentang item.
        """
        pass
    
    @abstractmethod
    def get_category(self) -> str:
        """
        Abstract method untuk mendapatkan kategori item.
        Setiap subclass harus mengimplementasikan method ini.
        """
        pass
    
    def borrow_item(self) -> bool:
        """
        Method untuk meminjam item.
        
        Returns:
            True jika berhasil dipinjam, False jika tidak tersedia
        """
        if self.__is_available:
            self.__is_available = False
            self.__borrowed_date = datetime.now()
            return True
        return False
    
    def return_item(self) -> bool:
        """
        Method untuk mengembalikan item.
        
        Returns:
            True jika berhasil dikembalikan
        """
        if not self.__is_available:
            self.__is_available = True
            self.__borrowed_date = None
            return True
        return False
    
    def __str__(self) -> str:
        """Override method __str__ untuk polymorphism"""
        status = "Tersedia" if self.__is_available else "Dipinjam"
        return f"[{self._item_id}] {self._title} - {status}"


class Book(LibraryItem):
    """
    Class untuk item buku yang mewarisi dari LibraryItem.
    Menerapkan konsep inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, publisher: str, 
                 year: int, author: str, isbn: str, pages: int):
        """
        Constructor untuk Book.
        
        Args:
            item_id: ID unik untuk buku
            title: Judul buku
            publisher: Penerbit buku
            year: Tahun terbit
            author: Penulis buku
            isbn: Nomor ISBN
            pages: Jumlah halaman
        """
        super().__init__(item_id, title, publisher, year)
        self._author = author  # Protected attribute
        self._isbn = isbn  # Protected attribute
        self.__pages = pages  # Private attribute
    
    @property
    def author(self) -> str:
        """Getter untuk author"""
        return self._author
    
    @property
    def pages(self) -> int:
        """Getter untuk pages"""
        return self.__pages
    
    def display_info(self) -> str:
        """
        Implementasi abstract method display_info untuk Book.
        Override method dari parent class (polymorphism).
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"""
╔══════════════════════════════════════════════════════════╗
║                    INFORMASI BUKU                        ║
╠══════════════════════════════════════════════════════════╣
║ ID          : {self._item_id:<43} ║
║ Judul       : {self._title:<43} ║
║ Penulis     : {self._author:<43} ║
║ Penerbit    : {self._publisher:<43} ║
║ Tahun       : {self._year:<43} ║
║ ISBN        : {self._isbn:<43} ║
║ Halaman     : {self.__pages:<43} ║
║ Status      : {status:<43} ║
╚══════════════════════════════════════════════════════════╝
"""
    
    def get_category(self) -> str:
        """Implementasi abstract method get_category"""
        return "Buku"


class Magazine(LibraryItem):
    """
    Class untuk item majalah yang mewarisi dari LibraryItem.
    Menerapkan konsep inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, publisher: str, 
                 year: int, issue_number: int, month: str):
        """
        Constructor untuk Magazine.
        
        Args:
            item_id: ID unik untuk majalah
            title: Judul majalah
            publisher: Penerbit majalah
            year: Tahun terbit
            issue_number: Nomor edisi
            month: Bulan terbit
        """
        super().__init__(item_id, title, publisher, year)
        self.__issue_number = issue_number  # Private attribute
        self.__month = month  # Private attribute
    
    @property
    def issue_number(self) -> int:
        """Getter untuk issue_number"""
        return self.__issue_number
    
    @property
    def month(self) -> str:
        """Getter untuk month"""
        return self.__month
    
    def display_info(self) -> str:
        """
        Implementasi abstract method display_info untuk Magazine.
        Override method dari parent class (polymorphism).
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"""
╔══════════════════════════════════════════════════════════╗
║                  INFORMASI MAJALAH                       ║
╠══════════════════════════════════════════════════════════╣
║ ID          : {self._item_id:<43} ║
║ Judul       : {self._title:<43} ║
║ Penerbit    : {self._publisher:<43} ║
║ Tahun       : {self._year:<43} ║
║ Edisi       : {self.__issue_number:<43} ║
║ Bulan       : {self.__month:<43} ║
║ Status      : {status:<43} ║
╚══════════════════════════════════════════════════════════╝
"""
    
    def get_category(self) -> str:
        """Implementasi abstract method get_category"""
        return "Majalah"


class Library:
    """
    Class untuk mengelola koleksi perpustakaan.
    Menerapkan konsep encapsulation untuk melindungi koleksi item.
    """
    
    def __init__(self, name: str):
        """
        Constructor untuk Library.
        
        Args:
            name: Nama perpustakaan
        """
        self.__name = name  # Private attribute
        self.__items: List[LibraryItem] = []  # Private attribute untuk koleksi item
        self.__total_borrowed = 0  # Private attribute untuk tracking peminjaman
    
    @property
    def name(self) -> str:
        """Getter untuk name perpustakaan"""
        return self.__name
    
    @property
    def total_items(self) -> int:
        """Getter untuk total item di perpustakaan"""
        return len(self.__items)
    
    @property
    def available_items(self) -> int:
        """Getter untuk jumlah item yang tersedia"""
        return sum(1 for item in self.__items if item.is_available)
    
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan.
        
        Args:
            item: LibraryItem yang akan ditambahkan
            
        Returns:
            True jika berhasil ditambahkan, False jika ID sudah ada
        """
        # Validasi item harus turunan dari LibraryItem
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan dari LibraryItem")
        
        # Cek apakah ID sudah ada
        if any(i.item_id == item.item_id for i in self.__items):
            print(f"[ERROR] Item dengan ID {item.item_id} sudah ada!")
            return False
        
        self.__items.append(item)
        print(f"[SUCCESS] {item.get_category()} '{item.title}' berhasil ditambahkan!")
        return True
    
    def display_all_items(self, filter_available: bool = False):
        """
        Menampilkan semua item di perpustakaan.
        Menerapkan polymorphism dengan memanggil __str__ dari setiap item.
        
        Args:
            filter_available: Jika True, hanya tampilkan item yang tersedia
        """
        if not self.__items:
            print("Perpustakaan masih kosong.")
            return
        
        print(f"\n{'='*60}")
        print(f"DAFTAR KOLEKSI PERPUSTAKAAN {self.__name.upper()}")
        print(f"{'='*60}")
        
        items_to_display = self.__items
        if filter_available:
            items_to_display = [item for item in self.__items if item.is_available]
            print("(Menampilkan item yang tersedia saja)")
        
        if not items_to_display:
            print("Tidak ada item yang tersedia saat ini.")
            return
        
        # Grouping berdasarkan kategori (polymorphism)
        categories = {}
        for item in items_to_display:
            category = item.get_category()
            if category not in categories:
                categories[category] = []
            categories[category].append(item)
        
        for category, items in categories.items():
            print(f"\n{category} ({len(items)} item):")
            print("-" * 60)
            for item in items:
                print(f"  {item}")  # Memanggil __str__ method (polymorphism)
        
        print(f"\n{'='*60}")
        print(f"Total: {len(items_to_display)} item")
        print(f"{'='*60}\n")
    
    def search_by_title(self, title: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (case-insensitive).
        
        Args:
            title: Judul yang dicari
            
        Returns:
            List item yang ditemukan
        """
        results = [item for item in self.__items 
                  if title.lower() in item.title.lower()]
        return results
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID.
        
        Args:
            item_id: ID yang dicari
            
        Returns:
            LibraryItem jika ditemukan, None jika tidak
        """
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def borrow_item(self, item_id: str) -> bool:
        """
        Meminjam item dari perpustakaan.
        
        Args:
            item_id: ID item yang akan dipinjam
            
        Returns:
            True jika berhasil dipinjam
        """
        item = self.search_by_id(item_id)
        if item is None:
            print(f"[ERROR] Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if item.borrow_item():
            self.__total_borrowed += 1
            print(f"[SUCCESS] Berhasil meminjam: {item.title}")
            return True
        else:
            print(f"[ERROR] Item '{item.title}' sedang dipinjam!")
            return False
    
    def return_item(self, item_id: str) -> bool:
        """
        Mengembalikan item ke perpustakaan.
        
        Args:
            item_id: ID item yang akan dikembalikan
            
        Returns:
            True jika berhasil dikembalikan
        """
        item = self.search_by_id(item_id)
        if item is None:
            print(f"[ERROR] Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if item.return_item():
            print(f"[SUCCESS] Berhasil mengembalikan: {item.title}")
            return True
        else:
            print(f"[ERROR] Item '{item.title}' belum dipinjam!")
            return False
    
    def display_statistics(self):
        """Menampilkan statistik perpustakaan"""
        print(f"\n{'='*60}")
        print(f"STATISTIK PERPUSTAKAAN {self.__name.upper()}")
        print(f"{'='*60}")
        print(f"Total Item       : {self.total_items}")
        print(f"Item Tersedia    : {self.available_items}")
        print(f"Item Dipinjam    : {self.total_items - self.available_items}")
        print(f"Total Peminjaman : {self.__total_borrowed}")
        print(f"{'='*60}\n")


def clear_screen():
    """Fungsi untuk membersihkan layar (opsional)"""
    print("\n" * 2)


def display_menu():
    """Menampilkan menu utama sistem perpustakaan"""
    print("\n" + "="*60)
    print(" SISTEM MANAJEMEN PERPUSTAKAAN ".center(60, "="))
    print("="*60)
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tampilkan Semua Item")
    print("4. Tampilkan Item Tersedia")
    print("5. Cari Item berdasarkan Judul")
    print("6. Cari Item berdasarkan ID")
    print("7. Pinjam Item")
    print("8. Kembalikan Item")
    print("9. Lihat Detail Item")
    print("10. Tampilkan Statistik")
    print("0. Keluar")
    print("="*60)


def input_book():
    """
    Fungsi untuk input data buku dari user.
    
    Returns:
        Book object atau None jika gagal
    """
    try:
        print("\n" + "="*60)
        print(" INPUT DATA BUKU ".center(60, "="))
        print("="*60)
        
        item_id = input("ID Buku (contoh: B001): ").strip()
        if not item_id:
            print("[ERROR] ID tidak boleh kosong!")
            return None
            
        title = input("Judul Buku: ").strip()
        if not title:
            print("[ERROR] Judul tidak boleh kosong!")
            return None
            
        author = input("Penulis: ").strip()
        if not author:
            print("[ERROR] Penulis tidak boleh kosong!")
            return None
            
        publisher = input("Penerbit: ").strip()
        if not publisher:
            print("[ERROR] Penerbit tidak boleh kosong!")
            return None
            
        year = int(input("Tahun Terbit: "))
        if year < 1000 or year > 2100:
            print("[ERROR] Tahun tidak valid!")
            return None
            
        isbn = input("ISBN: ").strip()
        pages = int(input("Jumlah Halaman: "))
        
        if pages <= 0:
            print("[ERROR] Jumlah halaman harus positif!")
            return None
        
        return Book(item_id, title, publisher, year, author, isbn, pages)
        
    except ValueError as e:
        print(f"[ERROR] Input tidak valid! {e}")
        return None


def input_magazine():
    """
    Fungsi untuk input data majalah dari user.
    
    Returns:
        Magazine object atau None jika gagal
    """
    try:
        print("\n" + "="*60)
        print(" INPUT DATA MAJALAH ".center(60, "="))
        print("="*60)
        
        item_id = input("ID Majalah (contoh: M001): ").strip()
        if not item_id:
            print("[ERROR] ID tidak boleh kosong!")
            return None
            
        title = input("Judul Majalah: ").strip()
        if not title:
            print("[ERROR] Judul tidak boleh kosong!")
            return None
            
        publisher = input("Penerbit: ").strip()
        if not publisher:
            print("[ERROR] Penerbit tidak boleh kosong!")
            return None
            
        year = int(input("Tahun Terbit: "))
        if year < 1000 or year > 2100:
            print("[ERROR] Tahun tidak valid!")
            return None
            
        issue_number = int(input("Nomor Edisi: "))
        if issue_number <= 0:
            print("[ERROR] Nomor edisi harus positif!")
            return None
            
        month = input("Bulan Terbit: ").strip()
        if not month:
            print("[ERROR] Bulan tidak boleh kosong!")
            return None
        
        return Magazine(item_id, title, publisher, year, issue_number, month)
        
    except ValueError as e:
        print(f"[ERROR] Input tidak valid! {e}")
        return None


def search_and_display(library: Library):
    """
    Fungsi untuk mencari dan menampilkan item berdasarkan judul.
    
    Args:
        library: Instance Library
    """
    print("\n" + "="*60)
    print(" PENCARIAN BERDASARKAN JUDUL ".center(60, "="))
    print("="*60)
    
    keyword = input("Masukkan kata kunci judul: ").strip()
    
    if not keyword:
        print("[ERROR] Kata kunci tidak boleh kosong!")
        return
    
    results = library.search_by_title(keyword)
    
    if not results:
        print(f"\n[ERROR] Tidak ditemukan item dengan kata kunci '{keyword}'")
    else:
        print(f"\n[SUCCESS] Ditemukan {len(results)} item:")
        print("-" * 60)
        for item in results:
            print(f"  {item}")
        print("-" * 60)


def search_by_id_and_display(library: Library):
    """
    Fungsi untuk mencari dan menampilkan item berdasarkan ID.
    
    Args:
        library: Instance Library
    """
    print("\n" + "="*60)
    print(" PENCARIAN BERDASARKAN ID ".center(60, "="))
    print("="*60)
    
    item_id = input("Masukkan ID item: ").strip()
    
    if not item_id:
        print("[ERROR] ID tidak boleh kosong!")
        return
    
    item = library.search_by_id(item_id)
    
    if item:
        print(f"\n[SUCCESS] Item ditemukan:")
        print(item.display_info())
    else:
        print(f"\n[ERROR] Item dengan ID '{item_id}' tidak ditemukan!")


def borrow_item_menu(library: Library):
    """
    Fungsi untuk menu peminjaman item.
    
    Args:
        library: Instance Library
    """
    print("\n" + "="*60)
    print(" PEMINJAMAN ITEM ".center(60, "="))
    print("="*60)
    
    item_id = input("Masukkan ID item yang akan dipinjam: ").strip()
    
    if not item_id:
        print("[ERROR] ID tidak boleh kosong!")
        return
    
    library.borrow_item(item_id)


def return_item_menu(library: Library):
    """
    Fungsi untuk menu pengembalian item.
    
    Args:
        library: Instance Library
    """
    print("\n" + "="*60)
    print(" PENGEMBALIAN ITEM ".center(60, "="))
    print("="*60)
    
    item_id = input("Masukkan ID item yang akan dikembalikan: ").strip()
    
    if not item_id:
        print("[ERROR] ID tidak boleh kosong!")
        return
    
    library.return_item(item_id)


def view_item_detail(library: Library):
    """
    Fungsi untuk melihat detail item.
    
    Args:
        library: Instance Library
    """
    print("\n" + "="*60)
    print(" DETAIL ITEM ".center(60, "="))
    print("="*60)
    
    item_id = input("Masukkan ID item: ").strip()
    
    if not item_id:
        print("[ERROR] ID tidak boleh kosong!")
        return
    
    item = library.search_by_id(item_id)
    
    if item:
        print(item.display_info())
    else:
        print(f"\n[ERROR] Item dengan ID '{item_id}' tidak ditemukan!")


def main():
    """Function utama dengan menu interaktif"""
    
    # Membuat instance perpustakaan
    library = Library("Perpustakaan Digital")
    
    # Data awal (opsional - bisa dihapus jika ingin mulai kosong)
    print("\nMemuat data awal perpustakaan...")
    library.add_item(Book("B001", "Python untuk Pemula", "Gramedia", 2023,
                          "John Doe", "978-123456789", 350))
    library.add_item(Book("B002", "Data Science Fundamental", "Erlangga", 2024,
                          "Jane Smith", "978-987654321", 420))
    library.add_item(Magazine("M001", "Tech Monthly", "Tech Publisher", 2024, 150, "Oktober"))
    
    print("Data awal berhasil dimuat!\n")
    
    # Main loop
    while True:
        display_menu()
        
        try:
            choice = input("\nPilih menu (0-10): ").strip()
            
            if choice == "1":
                # Tambah Buku
                book = input_book()
                if book:
                    library.add_item(book)
                    
            elif choice == "2":
                # Tambah Majalah
                magazine = input_magazine()
                if magazine:
                    library.add_item(magazine)
                    
            elif choice == "3":
                # Tampilkan Semua Item
                library.display_all_items()
                
            elif choice == "4":
                # Tampilkan Item Tersedia
                library.display_all_items(filter_available=True)
                
            elif choice == "5":
                # Cari berdasarkan Judul
                search_and_display(library)
                
            elif choice == "6":
                # Cari berdasarkan ID
                search_by_id_and_display(library)
                
            elif choice == "7":
                # Pinjam Item
                borrow_item_menu(library)
                
            elif choice == "8":
                # Kembalikan Item
                return_item_menu(library)
                
            elif choice == "9":
                # Lihat Detail Item
                view_item_detail(library)
                
            elif choice == "10":
                # Tampilkan Statistik
                library.display_statistics()
                
            elif choice == "0":
                # Keluar
                print("\n" + "="*60)
                print("Terima kasih telah menggunakan sistem perpustakaan!")
                print("="*60 + "\n")
                break
                
            else:
                print("\n[ERROR] Pilihan tidak valid! Silakan pilih menu 0-10.")
            
            # Pause sebelum kembali ke menu
            input("\nTekan Enter untuk melanjutkan...")
            clear_screen()
            
        except KeyboardInterrupt:
            print("\n\nProgram dihentikan oleh user.")
            break
        except Exception as e:
            print(f"\n[ERROR] Terjadi kesalahan: {e}")
            input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()