import { User, LoginData, APIResponse } from '../interfaces/UserInterface';
import axiosInstance from "./AuthInterceptor"

const API_URL = "http://localhost:3000";

// Signs up a new user
export const signup = async (data: Omit<User, 'user_id' | 'profile_pic'> ): Promise<APIResponse<User>> => {
  try {
    const response = await axiosInstance.post<APIResponse<User>>(`${API_URL}/auth/signup`, data);
    console.log("resposne signup ",response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logs in an existing user
export const login = async (data: LoginData): Promise<APIResponse<User>> => {
  try {
    const response = await axiosInstance.post<APIResponse<User>>(`${API_URL}/auth/login`, data);
    console.log("resposne login ",response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>(`${API_URL}/all/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


export const getSingleUSer = async (): Promise<User> => {
  try {
    const token=localStorage.getItem("accessToken");
    const response = await axiosInstance.get<User[]>(`${API_URL}/single/users`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("response aya ??",response);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

