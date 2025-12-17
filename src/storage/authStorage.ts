// src/storage/authStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../api/auth";
import { use } from "react";

const TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export async function saveToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token", error);
  }
}

export async function saveUserData(user: any): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user data", error);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
}

export async function getUserData<T = any>(): Promise<T | null> {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data", error);
    return null;
  }
}

export async function removeToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token", error);
  }
}

export async function removeUserData(): Promise<void> {
  try {
    await AsyncStorage.removeItem("user_data");
  } catch (error) {
    console.error("Error removing token", error);
  }
}

