import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [currentPage, setCurrentPage] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  // filterStatus menyimpan status yang sedang dipakai untuk memfilter daftar buku
  // nilai: 'semua' | 'dimiliki' | 'sedang-dibaca' | 'ingin-dibeli'
  // setFilterStatus dapat dipanggil dari Navigation atau FilterBar untuk sinkronisasi
  const [filterStatus, setFilterStatus] = useState('semua');

  const addBook = (book) => {
    try {
      const newBook = {
        id: Date.now(),
        ...book,
        createdAt: new Date().toISOString()
      };
      setBooks(prev => [...prev, newBook]);
      return { success: true, message: 'Buku berhasil ditambahkan!' };
    } catch (error) {
      console.error('Error adding book:', error);
      return { success: false, message: 'Gagal menambahkan buku' };
    }
  };

  const updateBook = (id, updatedBook) => {
    try {
      setBooks(prev => prev.map(book => 
        book.id === id ? { ...book, ...updatedBook } : book
      ));
      return { success: true, message: 'Buku berhasil diperbarui!' };
    } catch (error) {
      console.error('Error updating book:', error);
      return { success: false, message: 'Gagal memperbarui buku' };
    }
  };

  const deleteBook = (id) => {
    try {
      setBooks(prev => prev.filter(book => book.id !== id));
      return { success: true, message: 'Buku berhasil dihapus!' };
    } catch (error) {
      console.error('Error deleting book:', error);
      return { success: false, message: 'Gagal menghapus buku' };
    }
  };

  const getFilteredBooks = () => {
    // Fungsi utama untuk melakukan filtering:
    // 1) Filter berdasarkan status (filterStatus) jika bukan 'semua'
    // 2) Kemudian filter berdasarkan pencarian (searchQuery) pada title atau author
    let filtered = books;

    // Filter berdasarkan status jika dipilih selain 'semua'
    if (filterStatus !== 'semua') {
      filtered = filtered.filter(book => book.status === filterStatus);
    }

    // Filter berdasarkan query pencarian (case-insensitive)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  return (
    <BookContext.Provider value={{
      books,
      addBook,
      updateBook,
      deleteBook,
      getFilteredBooks,
      currentPage,
      setCurrentPage,
      searchQuery,
      setSearchQuery,
      filterStatus,
      setFilterStatus
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};