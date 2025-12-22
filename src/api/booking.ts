import { RentalModel } from "../models/rental";
import api from "./client";



const baseUrl = "/booking";

export async function createBooking(params: {
  ownedGameId: number;
  rentDate: Date;
  returnDate: Date;
  userId: number;
}) {
  const { ownedGameId, rentDate, returnDate, userId } = params;
  const payload = {
    ownedGameId,
    userId,
    rentDate: rentDate.toISOString(),
    returnDate: returnDate.toISOString(),
  };
  const res = await api.post<RentalModel>(`${baseUrl}`, payload);
  return res.data;
}

export async function getBookingsToConfirm() {
  const res = await api.get(`${baseUrl}/getMyconfirmingBooking`);
  return res.data as {
    rentalsOrgToConfirm: RentalModel[];
    myOwnedGamesBookingToCofirm: RentalModel[];
  };
}

export async function cancelBooking(rentalId: number) {
  const res = await api.put(`${baseUrl}/cancel/${rentalId}`);
  return res.data;
}

export async function confirmBooking(rentalId: number) {
  const res = await api.put(`${baseUrl}/confirmBooking/${rentalId}`);
  return res.data;
}


export async function activeRentalDeliveriStatus(rentalId: number) {
  try {
    const res = await api.put(`${baseUrl}/activateBooking/${rentalId}`);
    return res.data;
  } catch (error) {
    console.error("Error updating delivery status:", error);
    throw error;
  }
}