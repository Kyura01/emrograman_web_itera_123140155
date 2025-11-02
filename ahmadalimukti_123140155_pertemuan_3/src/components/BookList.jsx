import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookCard from './BookCard';
import BookForm from './BookForm';

const BookList = () => {
  const { getFilteredBooks, updateBook, deleteBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Ambil daftar buku yang telah difilter oleh BookContext (berdasarkan filterStatus dan searchQuery)
  // getFilteredBooks mengembalikan array buku yang sudah melewati aturan filter
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

export default BookList;