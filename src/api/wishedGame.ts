import { GameBdd, OwnedGame } from "../models/game-model";
import { WishedGameModel } from "../models/wishedGameModel";
import api from "./client";

const baseUrl = "/wishedGames";



export async function getMyWishedGames(): Promise <WishedGameModel[]>{
  const res = await api.get<WishedGameModel[]>(`${baseUrl}/getMyWishedGames`);
  return res.data;
}
