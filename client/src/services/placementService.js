import axios from "axios";

const API = "http://localhost:5000/api/placements";

// Get all placements
export const getPlacements = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Add placement
export const addPlacement = async (placementData) => {
  const response = await axios.post(API, placementData);
  return response.data;
};

// Update placement
export const updatePlacement = async (id, placementData) => {
  const response = await axios.put(`${API}/${id}`, placementData);
  return response.data;
};

// Delete placement
export const deletePlacement = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};