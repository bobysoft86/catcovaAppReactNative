import api from "./client";


const baseUrl = "/player"

export const createPlayer = async (payload: { ownerId: number; name: string }) => {
  try {
    const response = await api.post(baseUrl + "/createPlayer", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};
