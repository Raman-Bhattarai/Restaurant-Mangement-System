import React from "react";

function Filters({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
      
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search menu..."
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 w-full md:w-64"
      />
    </div>
  );
}

export default Filters;
