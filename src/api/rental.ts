import api from "./client";


const baseUrl = "/rental"

export const getGameRentalAvibility = async (id:string) => {
  try {
    const response = await api.get(baseUrl + `/getGameRentalAvibility/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

export async function getReturnsToConfirm() {
  try {
    const res = await api.get(`${baseUrl}/getMyReturns`);
    return res.data ;
  } catch (error) {
    console.error("Error fetching pending returns:", error);
    throw error;
  }
}

export async function getDeliveriesToConfirm() {
  try {
    const res = await api.get(`${baseUrl}/getMyDeliveries`);
    return res.data;
  } catch (error) {
    console.error("Error fetching pending deliveries:", error);
    throw error;
  }
}



export async function completeRental(id:number, type:string) {
  try {
    const res = await api.put(`${baseUrl}/completed/${id}`);
    return res.data ;
  } catch (error) {
    console.error("Error fetching pending returns:", error);
    throw error;
  }
}

