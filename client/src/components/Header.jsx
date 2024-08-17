import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { searchItems } from '../api/api';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchTerm.trim() === '') return;

    try {
      const response = await searchItems(searchTerm);
      const searchResults = response.data;

      navigate('/search', { state: { searchResults, searchTerm } });
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return (
    <header className='bg-gray-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link className='flex items-center gap-2' to='/'>
          <span className='font-bold text-color4 text-xl'>Guestara</span>
        </Link>
        <nav className='flex items-center gap-6'>
          <Link
            to='/category/create'
            className='hover:text-blue-600 transition-colors'
          >
            Create Category
          </Link>
          <Link
            to='/subcategory/create'
            className='hover:text-blue-600 transition-colors'
          >
            Create Subcategory
          </Link>
          <Link to='/item/create' className='hover:text-blue-600 transition-colors'>
            Create Item
          </Link>
        </nav>
        <form
          onSubmit={handleSearch}
          className='flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow'
        >
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search...'
            className='w-24 sm:w-64 py-2 px-6 border-none focus:outline-none text-gray-800'
          />
          <button type='submit' className='flex items-center justify-center w-12'>
            <FaSearch className='text-gray-600' />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
