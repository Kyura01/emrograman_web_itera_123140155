import React from 'react';
import { BookOpen } from 'lucide-react';
import { BookProvider } from './context/BookContext';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import AddBookSection from './components/AddBookSection';
import BookList from './components/BookList';
import './App.css';

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