import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryDetails from './components/CategoryDetails';
import Header from './components/Header';
import SubcategoryDetails from './components/SubCategoryDetails';
import ItemDetails from './components/ItemDetails';
import SearchResults from './components/SearchResults';
import EditCategory from './components/EditCategory';
import EditSubCategory from './components/EditSubCategory';
import EditItem from './components/EditItem';
import CreateCategory from './components/CreateCategory';
import CreateSubCategory from './components/CreateSubcategory';
import CreateItem from './components/CreateItem';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetails />} />
          <Route path="/category/edit/:categoryId" element={<EditCategory />} />
          <Route path="/subcategory/edit/:subcategoryId" element={<EditSubCategory />} />
          <Route path="/item/edit/:itemId" element={<EditItem  />} />
          <Route path="/subcategories/:subcategoryId" element={<SubcategoryDetails />} />
          <Route path="/category/create" element={<CreateCategory/>} />
          <Route path="/subcategory/create" element={<CreateSubCategory />} />
          <Route path="/items/:itemId" element={<ItemDetails />} />
          <Route path="/item/create" element={<CreateItem />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
