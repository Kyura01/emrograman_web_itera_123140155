import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

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

export default BookCard;