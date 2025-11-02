import React from 'react';
import { Search } from 'lucide-react';
import { useBooks } from '../context/BookContext';

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

export default SearchBar;