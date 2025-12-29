import { ApiChat } from "../models/chat-model";
import api from "./client";



const baseUrl = "/chat";

export async function getUserChats(): Promise<ApiChat[]> {
  const res = await api.get(`${baseUrl}/getUserChats`);
  console.log(res.data.chats)
  return res.data.chats;
}
