import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSubCategory, getAllCategories } from '../api/api'; // Import the API functions

const CreateSubCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    taxApplicability: false,
    tax: 0,
    category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data); // Assume the API returns an array of categories with _id and name
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
      // Sending the selected category ID along with the subcategory data
      await createSubCategory(formData.category, formData);
      navigate('/'); // Redirect to the home page or another relevant page after successful creation
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className='text-3xl text-center font-semibold my-7'>Create Subcategory</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Subcategory Name'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='Subcategory Image URL'
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
          </>
        )}
        <select
          id='category'
          name='category'
          value={formData.category}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        >
          <option value='' disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase'
        >
          Create Subcategory
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
