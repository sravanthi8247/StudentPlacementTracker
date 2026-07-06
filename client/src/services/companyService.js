import axios from "axios";

const API = "http://localhost:5000/api/companies";

// Get all companies
export const getCompanies = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Add company
export const addCompany = async (companyData) => {
  const response = await axios.post(API, companyData);
  return response.data;
};

// Update company
export const updateCompany = async (id, companyData) => {
  const response = await axios.put(`${API}/${id}`, companyData);
  return response.data;
};

// Delete company
export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};