import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, getAllSubCategories, getAllItems } from '../api/api'; // Adjust the import path as necessary

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, subCategoriesData, itemsData] = await Promise.all([
          getAllCategories(),
          getAllSubCategories(),
          getAllItems(),
        ]);

        setCategories(categoriesData.data);
        setSubCategories(subCategoriesData.data);
        setItems(itemsData.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Categories */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='text-center mb-3'>
          <h2 className='text-2xl font-bold'>Categories</h2>
        </div>
        <div className='flex flex-wrap gap-4 justify-center'>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      </div>

      {/* SubCategories */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='text-center mb-3'>
          <h2 className='text-2xl font-bold'>Subcategories</h2>
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {subCategories.map((subCategory) => (
            <SubCategoryItem key={subCategory._id} subCategory={subCategory} />
          ))}
        </div>
      </div>

      {/* Items */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='text-center mb-3'>
          <h2 className='text-2xl font-bold'>Items</h2>
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {items.map((item) => (
            <Item key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ category }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg flex flex-col transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <div>
        <Link to={`/categories/${category._id}`} className='flex flex-col h-full'>
          <img
            src={category.image}
            alt={category.name}
            className='h-[200px] w-full object-cover'
          />
          <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
            <p className='truncate text-lg font-semibold text-slate-700 text-center'>
              {category.name}
            </p>
            <p className='text-base text-gray-600 line-clamp-3 text-center'>
              {category.description}
            </p>
          </div>
        </Link>
      </div>
      <div className='p-3 text-center'>
        <Link to={`/category/edit/${category._id}`}>
          <button className='bg-blue-500 text-white py-2 w-full px-4 rounded hover:bg-blue-600'>
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

function SubCategoryItem({ subCategory }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <div>
        <Link to={`/subcategories/${subCategory._id}`} className='flex flex-col h-full'>
          <img
            src={subCategory.image}
            alt={subCategory.name}
            className='h-[200px] w-full object-cover'
          />
          <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
            <p className='truncate text-lg font-semibold text-slate-700 text-center'>
              {subCategory.name}
            </p>
            <p className='text-base text-gray-600 line-clamp-3 text-center'>
              {subCategory.description}
            </p>
          </div>
        </Link>
      </div>
      <div className='p-3 text-center w-full'>
        <Link to={`/subcategory/edit/${subCategory._id}`}>
          <button className='bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600'>
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

function Item({ item }) {
  return (
    <div className='bg-white shadow-md flex flex-col hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <div>
        <Link to={`/items/${item._id}`} className='flex flex-col h-full'>
          <img
            src={item.image}
            alt={item.name}
            className='h-[200px] w-full object-cover'
          />
          <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
            <p className='truncate text-lg font-semibold text-slate-700 text-center'>
              {item.name}
            </p>
            <p className='text-base text-gray-600 line-clamp-3 text-center'>
              {item.description}
            </p>
          </div>
        </Link>
      </div>
      <div className='p-3 text-center'>
        <Link to={`/item/edit/${item._id}`}>
          <button className='bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600'>
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
