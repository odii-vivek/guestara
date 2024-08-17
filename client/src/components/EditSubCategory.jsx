import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubCategoryById, updateSubCategory } from '../api/api'; // Adjust the import path as necessary
import Loader from './Loader';

export default function EditSubCategory() {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState({ name: '', description: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await getSubCategoryById(subcategoryId);
        setSubCategory(response.data);
      } catch (error) {
        console.error('Error fetching subcategory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [subcategoryId]);

  const handleChange = (event) => {
    setSubCategory({
      ...subCategory,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateSubCategory(subcategoryId, subCategory);
      navigate('/'); // Redirect to the home page or subcategory list page
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Edit Subcategory</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          value={subCategory.name}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          value={subCategory.description}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Image URL'
          className='border p-3 rounded-lg'
          id='image'
          value={subCategory.image}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase'
        >
          Update
        </button>
      </form>
    </div>
  );
}
