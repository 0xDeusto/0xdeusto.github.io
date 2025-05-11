import React from 'react';

const SearchFilterSection = ({ filter, setFilter, searchQuery, setSearchQuery, eventTypes }) => {
  return (
    <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
        {eventTypes.map((type, index) => (
          <button 
            key={index}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${filter === type 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {type === 'all' ? 'Todos' : type}
          </button>
        ))}
      </div>
      <div className="w-full md:w-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterSection;