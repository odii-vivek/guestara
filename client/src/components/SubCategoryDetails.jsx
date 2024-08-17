import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { getSubCategoryById, getItemsBySubCategory } from '../api/api'; // Import the methods from api.js
import Loader from './Loader';

SwiperCore.use([Navigation]);

const SubcategoryDetails = () => {
  const { subcategoryId } = useParams();
  const [subcategoryDetails, setSubcategoryDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        // Fetch subcategory details
        const response = await getSubCategoryById(subcategoryId);
        setSubcategoryDetails(response.data);

        // Fetch items for the subcategory
        const itemsResponse = await getItemsBySubCategory(subcategoryId);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching subcategory details:', error);
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryDetails();
  }, [subcategoryId]);

  return (
    <main className="min-h-screen">
      {loading && <Loader />}
      {error && <p className='text-center my-7 text-2xl text-red-600'>{error}</p>}
      {subcategoryDetails && !loading && !error && (
        <div className='max-w-5xl mx-auto p-6 my-10'>
          {/* Swiper for Image */}
          <Swiper navigation style={{ width: '100%' }} className='mb-6'>
            <SwiperSlide>
              <img
                src={subcategoryDetails.image}
                alt={subcategoryDetails.name}
                className='w-full h-[400px] object-cover rounded-lg shadow-md'
              />
            </SwiperSlide>
          </Swiper>

          {/* Subcategory Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold mb-4'>{subcategoryDetails.name}</h2>
            <p className='text-lg mb-6'>{subcategoryDetails.description}</p>

            {/* Tax Information */}
            <div className='bg-gray-100 p-4 rounded-lg shadow-md mb-6'>
              <h3 className='text-2xl font-semibold mb-2'>Tax Information</h3>
              <p>
                <span className='font-semibold'>Tax Applicable: </span>
                {subcategoryDetails.taxApplicability ? 'Yes' : 'No'}
              </p>
              {subcategoryDetails.taxApplicability && (
                <>
                  <p>
                    <span className='font-semibold'>Tax Rate: </span>
                    {subcategoryDetails.tax}%
                  </p>
                </>
              )}
            </div>

            {/* Items */}
            <div>
              <h3 className='text-2xl font-semibold mb-4'>Items</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {items.length > 0 ? (
                  items.map((item) => (
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
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className='text-lg text-gray-500'>No items available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SubcategoryDetails;
