import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 rounded-lg w-1/2"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-lg ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
