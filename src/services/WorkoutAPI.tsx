import axiosInstance from "./AuthInterceptor"

const API_BASE_URL = "http://localhost:3000";

const token = localStorage.getItem("accessToken");

// Fetches all available workouts
export const getAllWorkouts = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/all/workouts`);
  return response.data;
};

// Fetches workouts specific to the current user
export const getUserWorkouts = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Creates a new workout for the user
export const createWorkout = async (token: string, workout: any) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/workouts`, workout, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Updates an existing workout for the user
export const updateWorkout = async (token: string, workout: any) => {
  const response = await axiosInstance.patch(`${API_BASE_URL}/workouts`, workout, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Deletes a specific workout for the user
export const deleteWorkout = async (token: string, workout_id: number) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { workout_id },
  });
  return response.data;
};


export const fetchSteak=async()=>{
  console.log("ara ?")
  const response=await axiosInstance.get(`${API_BASE_URL}/streaks`,{
    headers: { Authorization: `Bearer ${token}` },
  })

  console.log("streak response ",response);

  return response.data;
}


export const fetchWorkoutDates = async (year:any, month:any) => {
    console.log("Fetching Workout Dates");
    const response = await axiosInstance.get(`${API_BASE_URL}/days`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { year, month },
    });

    console.log("Workout Dates Response:", response.data);
    return response.data;
};


export const uploadUserPhoto = async (file: File,email:string) => {
  const formData = new FormData();
  formData.append("photo", file);
  formData.append("email",email);

  console.log("file aya ",file);

  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/users/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Photo upload failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Photo upload failed");
  }
};

