import api from "./api.js";

// Get all companies
export const getCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

// Add company
export const addCompany = async (companyData) => {
  const response = await api.post("/companies", companyData);
  return response.data;
};

// Update company
export const updateCompany = async (id, companyData) => {
  const response = await api.put(`/companies/${id}`, companyData);
  return response.data;
};

// Delete company
export const deleteCompany = async (id) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};
