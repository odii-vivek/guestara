import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, createItemForCategory, getAllCategories, getAllSubCategories } from '../api/api'; // Import the API functions

const CreateItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    baseAmount: '',
    discount: '',
    isCategory: true,
    categoryOrSubcategory: '',
    taxApplicability: false,
    tax: 0,
    taxType: '',
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await getAllSubCategories();
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchCategories();
    fetchSubcategories();
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
      // Convert baseAmount and discount to numbers
      const { baseAmount, discount, categoryOrSubcategory, isCategory, tax, taxType, taxApplicability } = formData;
      const payload = {
        ...formData,
        baseAmount: parseFloat(baseAmount),
        discount: parseFloat(discount),
        tax: taxApplicability ? parseFloat(tax) : 0,
        taxType: taxApplicability ? taxType : '',
      };

      if (isCategory) {
        await createItemForCategory(categoryOrSubcategory, payload);
      } else {
        await createItem(categoryOrSubcategory, payload);
      }
      navigate('/'); // Redirect to the home page or another relevant page after successful creation
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className='text-3xl text-center font-semibold my-7'>Create Item</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Item Name'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <input
          type='text'
          placeholder='Item Image URL'
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
        <input
          type='number'
          placeholder='Base Amount'
          id='baseAmount'
          name='baseAmount'
          value={formData.baseAmount}
          onChange={handleChange}
          required
          className='border p-3 rounded-lg'
        />
        <input
          type='number'
          placeholder='Discount'
          id='discount'
          name='discount'
          value={formData.discount}
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
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='isCategory'
            name='isCategory'
            checked={formData.isCategory}
            onChange={handleChange}
            className='mr-2 leading-tight'
          />
          <label className='text-gray-700' htmlFor='isCategory'>
            Item belongs to Category?
          </label>
        </div>
        {formData.isCategory ? (
          <select
            id='categoryOrSubcategory'
            name='categoryOrSubcategory'
            value={formData.categoryOrSubcategory}
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
        ) : (
          <select
            id='categoryOrSubcategory'
            name='categoryOrSubcategory'
            value={formData.categoryOrSubcategory}
            onChange={handleChange}
            required
            className='border p-3 rounded-lg'
          >
            <option value='' disabled>Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        )}
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase'
        >
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
