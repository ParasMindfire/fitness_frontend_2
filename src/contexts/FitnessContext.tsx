import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from "react";
import { getAllFitnessGoals, createFitnessGoal, updateFitnessGoal, deleteFitnessGoal, getSingleFitnessGoal } from "../services/FitnessAPI";
import { showToast } from "../helpers/ToastHelper";
import { FitnessGoal } from "../interfaces/FitnessInterface";
import { FitnessContextProps } from "../interfaces/FitnessInterface";

const FitnessContext = createContext<FitnessContextProps | undefined>(undefined);

// FitnessProvider component that provides the context values to the children components
export const FitnessProvider = ({ children }: { children: ReactNode }) => {
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<FitnessGoal, "goal_id" | "user_id" | "status">>({
    goal_type: "weight_loss",
    target_value: 0,
    current_progress: 0,
    start_date: "",
    end_date: null,
  });

  // Function to fetch all fitness goals
  const fetchFitnessGoals = async () => {
    try {
      setLoading(true);
      const data = await getAllFitnessGoals();
      setFitnessGoals(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching fitness goals:", error);
      setError("Failed to load fitness goals");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new fitness goal
  const addFitnessGoal = async (goal: any) => {
    try {
      await createFitnessGoal(goal);
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error adding fitness goal:", error);
    }
  };

  // Function to update an existing fitness goal
  const editFitnessGoal = async (goal: any) => {
    try {
      await updateFitnessGoal(goal);
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error updating fitness goal:", error);
    }
  };

  // Function to remove a fitness goal by ID
  const removeFitnessGoal = async (goal_id: number) => {
    try {
      await deleteFitnessGoal(goal_id);
      showToast("Goal Deleted Successfully", "success");
      fetchFitnessGoals();
    } catch (error) {
      console.error("Error deleting fitness goal:", error);
    }
  };

  // Function to fetch a single fitness goal by its ID
  const fetchSingleFitnessGoal = async (goal_id: number) => {
    try {
      return await getSingleFitnessGoal(goal_id);
    } catch (error) {
      console.error("Error fetching single fitness goal:", error);
      return null;
    }
  };

  // Use the effect hook to fetch all fitness goals when the component is mounted
  useEffect(() => {
    fetchFitnessGoals();
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    fitnessGoals,
    loading,
    error,
    fetchFitnessGoals,
    addFitnessGoal,
    editFitnessGoal,
    removeFitnessGoal,
    fetchSingleFitnessGoal,
    id,
    setId,
    formData,
    setFormData,
  }), [fitnessGoals, loading, error, id, formData]);

  // Provide the context values to the children components
  return (
    <FitnessContext.Provider value={contextValue}>
      {children}
    </FitnessContext.Provider>
  );
};

// Custom hook to access the fitness context values
export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) throw new Error("useFitness must be used within a FitnessProvider");
  return context;
};
