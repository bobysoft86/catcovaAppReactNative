import api from "./client";
import { saveToken, saveUserData } from "@/src/storage/authStorage";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  token?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const baseUrl = "/auth/"

export async function login(email: string, password: string): Promise<User> {


  const res = await api.post<AuthResponse>(`${baseUrl}login`, {
    email,
    password,
  });

  const { token, user } = res.data;

  await saveToken(token);
  await saveUserData(user);

  return user;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  phone:string

): Promise<User> {
  const res = await api.post<AuthResponse>(`${baseUrl}register`, {
    name,
    email,
    phone,
    password,
  });

  const { token, user } = res.data;

  await saveToken(token);
  await saveUserData(user);

  return user;
}

export async function homeMetaData():Promise <any> {

 const res = await api.put(`${baseUrl}/homeUserMetaData}`);
  return res.data;


}