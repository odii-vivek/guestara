import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults, searchTerm } = location.state || { searchResults: [], searchTerm: '' };

  return (
    <main className='min-h-screen'>
      <div className='max-w-5xl mx-auto p-6 my-10'>
        <h2 className='text-3xl font-bold mb-4'>Search Results for "{searchTerm}"</h2>

        {searchResults.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {searchResults.map((item) => (
              <Link
                to={`/items/${item._id}`}
                key={item._id}
                className='w-full'
              >
                <div className='bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='h-[200px] w-full object-cover'
                  />
                  <div className='p-4 text-center'>
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <p className='text-gray-600'>{item.description}</p>
                    <p className='text-gray-600'>Price: ${item.price}</p>
                    <p className='text-gray-600'>Category: {item.categoryName}</p>
                    <p className='text-gray-600'>Subcategory: {item.subcategoryName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className='text-lg text-gray-500'>No items found for your search.</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
