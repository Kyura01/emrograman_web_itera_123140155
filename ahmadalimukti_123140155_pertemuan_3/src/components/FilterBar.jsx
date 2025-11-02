import React from 'react';
import { Filter } from 'lucide-react';
import { useBooks } from '../context/BookContext';

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

export default FilterBar;