import React from 'react';
import { Home, BookOpen, ShoppingCart } from 'lucide-react';
import { useBooks } from '../context/BookContext';

const Navigation = () => {
  const { currentPage, setCurrentPage, books, setFilterStatus } = useBooks();
  
  const navItems = [
    { id: 'semua', label: 'Semua', icon: Home, count: books.length },
    { id: 'dimiliki', label: 'Dimiliki', icon: BookOpen, count: books.filter(b => b.status === 'dimiliki').length },
    { id: 'sedang-dibaca', label: 'Sedang Dibaca', icon: BookOpen, count: books.filter(b => b.status === 'sedang-dibaca').length },
    { id: 'ingin-dibeli', label: 'Ingin Dibeli', icon: ShoppingCart, count: books.filter(b => b.status === 'ingin-dibeli').length }
  ];

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => {
              // Ketika user klik item navigation, kita:
              // - setCurrentPage untuk menandai halaman aktif (highlight)
              // - setFilterStatus agar daftar buku ikut terfilter sesuai item
              // Dengan cara ini Navigation dan FilterBar akan tetap sinkron
              setCurrentPage(item.id);
              setFilterStatus(item.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              currentPage === item.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              currentPage === item.id ? 'bg-blue-600' : 'bg-gray-200'
            }`}>
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;