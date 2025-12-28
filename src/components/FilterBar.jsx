import React, { useState } from 'react';

export default function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    price: '',
    category: '',
    useCase: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (onFilter) onFilter(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-bold mb-4">Filter Tools</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <select
            name="price"
            value={filters.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Writing">Writing & Content</option>
            <option value="Design">Design</option>
            <option value="Productivity">Productivity</option>
          </select>
        </div>

        {/* Use Case Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
          <select
            name="useCase"
            value={filters.useCase}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Use Cases</option>
            <option value="Writing">Writing</option>
            <option value="Design">Design</option>
            <option value="Research">Research</option>
          </select>
        </div>
      </div>
    </div>
  );
}
