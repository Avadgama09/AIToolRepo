import React, { useState } from 'react';

export default function ToolCard({ tool, onAddFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onAddFavorite) onAddFavorite(tool);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <div className="text-4xl mb-4">{tool.image}</div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{tool.description}</p>

      <div className="space-y-2 mb-4 text-sm">
        <p className="text-blue-600 font-semibold">{tool.price}</p>
        <p className="text-gray-600">
          <span className="font-medium">Category:</span> {tool.category}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleFavorite}
          className={`flex-grow px-3 py-2 rounded transition text-sm ${
            isFavorite
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isFavorite ? '❤️ Saved' : '🤍 Save'}
        </button>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
        >
          Visit →
        </a>
      </div>
    </div>
  );
}
