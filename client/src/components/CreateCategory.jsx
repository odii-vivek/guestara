import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../api/api'; // Import the API function for creating a category

const CreateCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    taxApplicability: false,
    tax: 0,
    taxType: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(formData);
      navigate('/'); // Redirect to the home page or another relevant page after successful creation
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className='text-3xl text-center font-semibold my-7'>Create Category</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Category Name'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='Category Image URL'
          id='image'
          name='image'
          value={formData.image}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <textarea
          placeholder='Description'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='taxApplicability'
            name='taxApplicability'
            checked={formData.taxApplicability}
            onChange={handleChange}
            className='mr-2 leading-tight'
          />
          <label className='text-gray-700' htmlFor='taxApplicability'>
            Tax Applicable?
          </label>
        </div>
        {formData.taxApplicability && (
          <>
            <input
              type='number'
              placeholder='Tax Percentage'
              id='tax'
              name='tax'
              value={formData.tax}
              onChange={handleChange}
              required
              className='border p-3 rounded-lg'
            />
            <input
              type='text'
              placeholder='Tax Type'
              id='taxType'
              name='taxType'
              value={formData.taxType}
              onChange={handleChange}
              className='border p-3 rounded-lg'
            />
          </>
        )}
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase'
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
