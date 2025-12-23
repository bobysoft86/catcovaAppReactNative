import { MatchModel, MatchCreatePayload, MatchUpdatePayload } from "../models/match-model";
import api from "./client";


const baseUrl = "/match";

export async function createMatch(payload: MatchCreatePayload): Promise<MatchModel> {
  const res = await api.post<MatchModel>(`${baseUrl}/createMatch`, payload);
  return res.data;
}

export async function updateMatch(id: number, payload: MatchUpdatePayload): Promise<MatchModel> {
  const res = await api.put<MatchModel>(`${baseUrl}/${id}`, payload);
  return res.data;
}

export async function getMatch(id: number): Promise<MatchModel> {
  const res = await api.get<MatchModel>(`${baseUrl}/${id}`);
  return res.data;
}

export async function listMatches(): Promise<MatchModel[]> {
  const res = await api.get<MatchModel[]>(`${baseUrl}`);
  return res.data;
}

export async function deleteMatch(id: number): Promise<void> {
  await api.delete(`${baseUrl}/${id}`);
}

export async function getAllUserMatches(): Promise<MatchModel[]> {
  const res = await api.get(`${baseUrl}/getUserMatches`);
  return res.data
}
