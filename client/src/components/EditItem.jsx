import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemById, updateItem } from '../api/api'; // Adjust the import path as necessary

export default function EditItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({ name: '', description: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(itemId);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (event) => {
    setItem({
      ...item,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateItem(itemId, item);
      navigate('/'); // Redirect to the home page or item list page
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Edit Item</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          value={item.name}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description'
          value={item.description}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Image URL'
          className='border p-3 rounded-lg'
          id='image'
          value={item.image}
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
