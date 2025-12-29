import { matrixData, UserModel } from "../models/user-model";
import api from "./client";
import { saveMatrixData, saveToken, saveUserData } from "@/src/storage/authStorage";



interface AuthResponse {
  token: string;
  user: UserModel;
  matrix: matrixData
}

const baseUrl = "/auth/"

export async function login(email: string, password: string): Promise<UserModel> {


  const res = await api.post<AuthResponse>(`${baseUrl}login`, {
    email,
    password,
  });

  const { token, user, matrix } = res.data;

  await saveToken(token);
  await saveUserData(user);
  await saveMatrixData(matrix)


  return user;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  phone:string

): Promise<UserModel> {
  const res = await api.post<AuthResponse>(`${baseUrl}register`, {
    name,
    email,
    phone,
    password,
  });

  const { token, user,matrix } = res.data;

  await saveToken(token);
  await saveUserData(user);
  await saveMatrixData(matrix)


  return user;
}

export async function homeMetaData():Promise <any> {

 const res = await api.put(`${baseUrl}/homeUserMetaData}`);
  return res.data;


}