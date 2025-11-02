import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import BookForm from './BookForm';

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

export default AddBookSection;