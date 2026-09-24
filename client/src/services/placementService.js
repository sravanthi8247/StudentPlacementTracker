import api from "./api.js";

// Get all placements
export const getPlacements = async () => {
  const response = await api.get("/placements");
  return response.data;
};

// Add placement
export const addPlacement = async (placementData) => {
  const response = await api.post("/placements", placementData);
  return response.data;
};

// Update placement
export const updatePlacement = async (id, placementData) => {
  const response = await api.put(`/placements/${id}`, placementData);
  return response.data;
};

// Delete placement
export const deletePlacement = async (id) => {
  const response = await api.delete(`/placements/${id}`);
  return response.data;
};
