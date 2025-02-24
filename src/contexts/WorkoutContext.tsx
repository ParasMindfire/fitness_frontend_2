import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from "react";
import { Workout } from "../interfaces/WorkoutInterface";
import { getUserWorkouts } from "../services/WorkoutAPI";
import { WorkoutContextProps } from "../interfaces/WorkoutInterface";

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

// WorkoutProvider component that provides workout-related state and actions to children components
export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Workout | null>(null);
  const [id, setId] = useState<any>(null);

  // Function to fetch workouts from the API and update the state
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getUserWorkouts();
      setWorkouts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setError("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  // Fetch workouts when the component is mounted
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    workouts,
    loading,
    error,
    fetchWorkouts,
    formData,
    setFormData,
    id,
    setId,
  }), [workouts, loading, error, formData, id]);

  return (
    // Provide the context values (workouts, loading, error, etc.) to children components
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom hook to access the workout context values
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
};
