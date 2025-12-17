import api from "./client";


const baseUrl = "/users"


export const getUserProfile = async () => {
  try {
    const response = await api.get(baseUrl + "/profile/summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserPlayersAndOrganizations = async (userId: number) => {
  try {
    const response = await api.get(baseUrl + `/userPlayersAndOrganizations/${userId}`);
    console.log("User players and organizations:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user players and organizations:", error);
    throw error;
  }
};