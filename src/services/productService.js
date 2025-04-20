import axios from "axios";

const API_URL = "http://localhost:3001/api/products";

const getProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
const getProductById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  getProducts,
  deleteProduct,
  getProductById
};