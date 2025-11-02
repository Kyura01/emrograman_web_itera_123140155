import React, { useState } from 'react';
import { BookOpen, Search, Plus, Edit2, Trash2, Home, ShoppingCart, Filter } from 'lucide-react';
import { BookProvider, useBooks } from './context/BookContext';
import { useFormValidation } from './hooks/useFormValidation';

// Navigation Component
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
              // keep navigation and filter select in sync
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

// SearchBar Component
const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBooks();

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// FilterBar Component
const FilterBar = () => {
  const { filterStatus, setFilterStatus, setCurrentPage } = useBooks();

  const statuses = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'dimiliki', label: 'Dimiliki' },
    { value: 'sedang-dibaca', label: 'Sedang Dibaca' },
    { value: 'ingin-dibeli', label: 'Ingin Dibeli' }
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      <Filter size={20} className="text-gray-500" />
      <select
        value={filterStatus}
        onChange={(e) => {
          // keep select and navigation in sync
          setFilterStatus(e.target.value);
          setCurrentPage(e.target.value);
        }}
        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {statuses.map(status => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// BookCard Component
const BookCard = ({ book, onEdit, onDelete }) => {
  const statusConfig = {
    'dimiliki': { color: 'bg-green-100 text-green-700', label: 'Dimiliki' },
    'sedang-dibaca': { color: 'bg-blue-100 text-blue-700', label: 'Sedang Dibaca' },
    'ingin-dibeli': { color: 'bg-orange-100 text-orange-700', label: 'Ingin Dibeli' }
  };

  const status = statusConfig[book.status];

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{book.title}</h3>
          <p className="text-gray-600 text-sm">oleh {book.author}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.label}
        </span>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Edit2 size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 size={16} />
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
};

// BookForm Component
const BookForm = ({ initialValues, onSubmit, onCancel }) => {
  const { values, errors, handleChange, validateForm, resetForm } = useFormValidation(
    initialValues || { title: '', author: '', status: '' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {initialValues ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Buku <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Penulis <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={values.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.author ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.status ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          >
            <option value="">Pilih Status</option>
            <option value="dimiliki">Dimiliki</option>
            <option value="sedang-dibaca">Sedang Dibaca</option>
            <option value="ingin-dibeli">Ingin Dibeli</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {initialValues ? 'Perbarui Buku' : 'Tambah Buku'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// BookList Component
const BookList = () => {
  const { getFilteredBooks, updateBook, deleteBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const filteredBooks = getFilteredBooks();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (updatedData) => {
    const result = updateBook(editingBook.id, updatedData);
    showNotification(result.message, result.success ? 'success' : 'error');
    setEditingBook(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      const result = deleteBook(id);
      showNotification(result.message, result.success ? 'success' : 'error');
    }
  };

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {editingBook && (
        <BookForm
          initialValues={editingBook}
          onSubmit={handleUpdate}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">Tidak ada buku.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

// AddBookSection Component
const AddBookSection = () => {
  const { addBook } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = (bookData) => {
    const result = addBook(bookData);
    showNotification(result.message, result.success ? 'success' : 'error');
    if (result.success) {
      setShowForm(false);
    }
  };

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2 mb-6"
        >
          <Plus size={20} />
          <span>Tambah Buku</span>
        </button>
      ) : (
        <BookForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}
    </>
  );
};

// Main App Component
function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={32} className="text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-800">Perpustakaan Pribadi</h1>
            </div>
            <p className="text-gray-600">Kelola koleksi buku Anda dengan mudah</p>
          </header>

          <Navigation />
          <AddBookSection />
          <SearchBar />
          <FilterBar />
          <BookList />
        </div>
      </div>
    </BookProvider>
  );
}

export default App;