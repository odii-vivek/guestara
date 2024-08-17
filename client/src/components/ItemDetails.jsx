import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { getItemById, getCategoryById, getSubCategoryById } from '../api/api'; // Import the methods from api.js

SwiperCore.use([Navigation]);

const ItemDetails = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await getItemById(itemId);
        const item = response.data;
        setItemDetails(item);

        if (item.category) {
          const categoryResponse = await getCategoryById(item.category);
          setCategoryName(categoryResponse.data.name);
        }

        if (item.subcategory) {
          const subcategoryResponse = await getSubCategoryById(item.subcategory);
          setSubcategoryName(subcategoryResponse.data.name);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  return (
    <main className="min-h-screen">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl text-red-600'>{error}</p>}
      {itemDetails && !loading && !error && (
        <div className='max-w-5xl mx-auto p-6 my-10'>
          {/* Swiper for Image */}
          <Swiper navigation style={{ width: '100%' }} className='mb-6'>
            <SwiperSlide>
              <img
                src={itemDetails.image}
                alt={itemDetails.name}
                className='w-full h-[400px] object-cover rounded-lg shadow-md'
              />
            </SwiperSlide>
          </Swiper>

          {/* Item Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold mb-4'>{itemDetails.name}</h2>
            <p className='text-lg mb-6'>{itemDetails.description}</p>

            {/* Tax Information */}
            <div className='bg-gray-100 p-4 rounded-lg shadow-md mb-6'>
              <h3 className='text-2xl font-semibold mb-2'>Tax Information</h3>
              <p>
                <span className='font-semibold'>Tax Applicable: </span>
                {itemDetails.taxApplicability ? 'Yes' : 'No'}
              </p>
              {itemDetails.taxApplicability && (
                <>
                  <p>
                    <span className='font-semibold'>Tax Rate: </span>
                    {itemDetails.tax}%
                  </p>
                </>
              )}
            </div>

            {/* Parent Category or Subcategory */}
            <div className='mb-6'>
              {itemDetails.category && !itemDetails.subcategory && (
                <p className='text-lg'>
                  <span className='font-semibold'>Parent Category: </span>
                  {categoryName}
                </p>
              )}
              {itemDetails.subcategory && !itemDetails.category && (
                <p className='text-lg'>
                  <span className='font-semibold'>Parent Subcategory: </span>
                  {subcategoryName}
                </p>
              )}
              {itemDetails.category && itemDetails.subcategory && (
                <div>
                  <p className='text-lg'>
                    <span className='font-semibold'>Parent Category: </span>
                    {categoryName}
                  </p>
                  <p className='text-lg'>
                    <span className='font-semibold'>Parent Subcategory: </span>
                    {subcategoryName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ItemDetails;
