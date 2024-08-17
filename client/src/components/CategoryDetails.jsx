import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { getCategoryById, getSubCategoriesByCategory, getItemsByCategory } from '../api/api'; // Import the methods from api.js
import Loader from './Loader';

SwiperCore.use([Navigation]);

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        // Fetch category details
        const response = await getCategoryById(categoryId);
        setCategoryDetails(response.data);

        // Fetch subcategories based on the category ID
        const subcategoriesResponse = await getSubCategoriesByCategory(categoryId);
        setSubcategories(subcategoriesResponse.data);

        // Fetch items for the category
        const itemsResponse = await getItemsByCategory(categoryId);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  return (
    <main className="min-h-screen">
      {loading && <Loader />}
      {error && <p className='text-center my-7 text-2xl text-red-600'>{error}</p>}
      {categoryDetails && !loading && !error && (
        <div className='max-w-5xl mx-auto p-6 my-10'>
          {/* Swiper for Image */}
          <Swiper navigation style={{ width: '100%' }} className='mb-6'>
            <SwiperSlide>
              <img
                src={categoryDetails.image}
                alt={categoryDetails.name}
                className='w-full h-[400px] object-cover rounded-lg shadow-md'
              />
            </SwiperSlide>
          </Swiper>

          {/* Category Details */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold mb-4'>{categoryDetails.name}</h2>
            <p className='text-lg mb-6'>{categoryDetails.description}</p>

            {/* Tax Information */}
            <div className='bg-gray-100 p-4 rounded-lg shadow-md mb-6'>
              <h3 className='text-2xl font-semibold mb-2'>Tax Information</h3>
              <p>
                <span className='font-semibold'>Tax Applicable: </span>
                {categoryDetails.taxApplicability ? 'Yes' : 'No'}
              </p>
              {categoryDetails.taxApplicability && (
                <>
                  <p>
                    <span className='font-semibold'>Tax Rate: </span>
                    {categoryDetails.tax}%
                  </p>
                  {categoryDetails.taxType && (
                    <p>
                      <span className='font-semibold'>Tax Type: </span>
                      {categoryDetails.taxType}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Subcategories */}
            <div className='mb-10'>
              <h3 className='text-2xl font-semibold mb-4'>Subcategories</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {subcategories.length > 0 ? (
                  subcategories.map((subCategory) => (
                    <Link
                      to={`/subcategories/${subCategory._id}`}
                      key={subCategory._id}
                      className='w-full'
                    >
                      <div className='bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden'>
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className='h-[200px] w-full object-cover'
                        />
                        <div className='p-4 text-center'>
                          <p className='text-lg font-semibold'>{subCategory.name}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className='text-lg text-gray-500'>No subcategories available.</p>
                )}
              </div>
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

export default CategoryDetails;
