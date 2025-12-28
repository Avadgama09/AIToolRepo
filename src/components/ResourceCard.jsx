import React from 'react';
import { formatDate } from '../utils/helpers';

export default function ResourceCard({ resource }) {
  const typeColors = {
    Blog: 'bg-blue-100 text-blue-800',
    Guide: 'bg-green-100 text-green-800',
    Playbook: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[resource.type] || 'bg-gray-100'}`}>
          {resource.type}
        </span>
        <span className="text-xs text-gray-500">{formatDate(resource.date)}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>By {resource.author}</span>
        <span>{resource.readTime}</span>
      </div>

      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
        Read More →
      </button>
    </div>
  );
}
