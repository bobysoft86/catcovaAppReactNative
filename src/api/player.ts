import api from "./client";


const baseUrl = "/player"


export const getAllPlayers = async () => {
  try {
    const response = await api.get(baseUrl + "/" );
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};



export const createPlayer = async (payload: { ownerId: number; name: string }) => {
  try {
    const response = await api.post(baseUrl + "/createPlayer", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};


