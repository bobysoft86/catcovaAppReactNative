import { GameBdd } from "../models/game-model";
import api from "./client";



const baseUrl = "/gamesBdd"

export async function   getAllGamesBdd(){

const res = await api.get<GameBdd[]>(`${baseUrl}`);

return res.data;    

}

export async function getGameByIdBdd(id: string): Promise<GameBdd> {
  const res = await api.get<GameBdd>(`${baseUrl}/getGameById/${id}`);
  return res.data;
}



