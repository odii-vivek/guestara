import axios from 'axios';

const API_URL = 'https://guestara-thgj.onrender.com'; // Adjust this URL according to your backend setup

// Category APIs
export const createCategory = async (category) => {
  return axios.post(`${API_URL}/categories/create`, category);
};

export const getAllCategories = async () => {
  return axios.get(`${API_URL}/categories`);
};

export const getCategoryById = async (id) => {
  return axios.get(`${API_URL}/categories/${id}`);
};

export const getCategoryByName = async (name) => {
  return axios.get(`${API_URL}/categories/name/${name}`);
};

export const updateCategory = async (id, category) => {
  return axios.put(`${API_URL}/categories/update/${id}`, category);
};

// SubCategory APIs
export const createSubCategory = async (categoryId, subcategory) => {
  return axios.post(`${API_URL}/subcategories/create/${categoryId}`, subcategory);
};

export const getAllSubCategories = async () => {
  return axios.get(`${API_URL}/subcategories`);
};

export const getSubCategoryById = async (id) => {
  return axios.get(`${API_URL}/subcategories/${id}`);
};

export const getSubCategoriesByCategory = async (categoryId) => {
  return axios.get(`${API_URL}/subcategories/category/${categoryId}`);
};

export const getSubCategoryByName = async (name) => {
  return axios.get(`${API_URL}/subcategories/name/${name}`);
};

export const updateSubCategory = async (id, subcategory) => {
  return axios.put(`${API_URL}/subcategories/update/${id}`, subcategory);
};

// Item APIs
export const createItem = async (subcategoryId, item) => {
  return axios.post(`${API_URL}/items/create/subcategory/${subcategoryId}`, item);
};

export const createItemForCategory = async (categoryId, item) => {
  return axios.post(`${API_URL}/items/create/category/${categoryId}`, item);
};

export const getAllItems = async () => {
  return axios.get(`${API_URL}/items`);
};

export const getItemsByCategory = async (categoryId) => {
  return axios.get(`${API_URL}/items/category/${categoryId}`);
};

export const getItemsBySubCategory = async (subcategoryId) => {
  return axios.get(`${API_URL}/items/subcategory/${subcategoryId}`);
};

export const getItemById = async (id) => {
  return axios.get(`${API_URL}/items/${id}`);
};

export const getItemByName = async (name) => {
  return axios.get(`${API_URL}/items/name/${name}`);
};

export const searchItems = async (name) => {
  return axios.get(`${API_URL}/items/name/${name}`);
};


export const updateItem = async (id, item) => {
  return axios.put(`${API_URL}/items/update/${id}`, item);
};
