import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../api/api'; // Adjust the import path as necessary

export default function EditCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '', description: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(categoryId);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCategory(categoryId, category);
      navigate('/'); // Redirect to the home page or category list page
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Edit Category</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          value={category.name}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          value={category.description}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Image URL'
          className='border p-3 rounded-lg'
          id='image'
          value={category.image}
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
