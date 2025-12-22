import { GameBdd, OwnedGame, OwnedGameCreatePayload } from "../models/game-model";
import api from "./client";



const baseUrl = "/ownedGames";

export async function createOwnedGameBdd(data: OwnedGameCreatePayload): Promise<GameBdd> {
  const res = await api.post<GameBdd>(`${baseUrl}/createOwnedGame`, data);
  console.log("createOwnedGameBdd response:", res.data);
  return res.data;
}

export async function listOwnedGames(): Promise<OwnedGame[]> {
  const res = await api.get<OwnedGame[]>(`${baseUrl}`);
  return res.data;
}

export async function getOwnedGamesMeta(): Promise<{
  users: { id: number; name: string; email: string; role: string }[];
  statuses: { id: number; name: string }[];
  organizations: { id: number; name: string }[];
}> {
  const res = await api.get(`${baseUrl}/meta`);
  return res.data;
}

export async function updateOwnedGame(
  id: number,
  data: Partial<Pick<OwnedGame, "statusId" | "value" | "isActiveToRent" | "isActiveToChange" | "maxRentTime"| "locationId">>
): Promise<OwnedGame> {
  const res = await api.put<OwnedGame>(`${baseUrl}/updateOwnedGame/${id}`, data);
  return res.data;
}

export async function myOwnedGamesList(): Promise <OwnedGame[]>{
  const res = await api.get<OwnedGame[]>(`${baseUrl}/getMyOwnedGames`);
  return res.data;
}

export async function getOwnedGameById(id:String): Promise <OwnedGame>{
  const res = await api.get<OwnedGame>(`${baseUrl}/getOwnedGameById/${id}`);
  return res.data;
}
