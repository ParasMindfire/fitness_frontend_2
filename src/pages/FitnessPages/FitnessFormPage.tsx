import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useFitness } from "../../contexts/FitnessContext";
import { showToast } from "../../helpers/ToastHelper";
import { useNavigate } from "react-router-dom";
import {
  GOAL_TYPE,
  WEIGHT_LOSS,
  TARGET_VALUE,
  CURRENT_PROGRESS,
  START_DATE,
  END_DATA,
  STATUS,
  PENDING,
  COMPLETE,
  INCOMPLETE,
  UPDATE_GOAL,
  ADD_GOAL,
  BACK_TO_DASHBOARD,
} from "../../constants";

interface FitnessFormData {
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string;
  status: string;
}

const FitnessFormPage = () => {
  const {
    addFitnessGoal,
    editFitnessGoal,
    id,
    setId,
    formData,
    setFormData,
    fetchFitnessGoals,
  } = useFitness();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FitnessFormData>({
    defaultValues: {
      goal_type: "weight_loss",
      target_value: 0,
      current_progress: 0,
      start_date: "",
      end_date: "",
      status: "pending",
    },
  });

  // Populate the form when formData is available (for editing)
  useEffect(() => {
    if (formData) {
      reset({
        goal_type: formData.goal_type,
        target_value: formData.target_value,
        current_progress: formData.current_progress,
        start_date: formData.start_date,
        end_date: formData.end_date || "",
        status: formData.status || "pending",
      });
    }
  }, [formData, reset]);

  const onSubmit = async (data: FitnessFormData) => {
    // Additional check: end_date should not be less than start_date
    if (data.start_date && data.end_date && new Date(data.end_date) < new Date(data.start_date)) {
      showToast("End date cannot be less than start date", "error");
      return;
    }

    try {
      if (id !== null) {
        await editFitnessGoal({ goal_id: id, ...data });
        setId(null);
        showToast("Goal Edited Successfully", "success");
      } else {
        await addFitnessGoal(data);
        showToast("Goal Added Successfully", "success");
      }

      setFormData(null);
      reset({
        goal_type: "weight_loss",
        target_value: 0,
        current_progress: 0,
        start_date: "",
        end_date: "",
        status: "pending",
      });

      navigate("/fitnessViews");
      fetchFitnessGoals();
    } catch (error) {
      showToast("An error occurred. Please try again!", "error");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow-xl w-96 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          {id !== null ? "Edit Fitness Goal" : "Add Fitness Goal"}
        </h2>

        <div>
          <label htmlFor="goal_type" className="block text-gray-700 font-medium">
            {GOAL_TYPE}
          </label>
          <select
            id="goal_type"
            {...register("goal_type", { required: "Goal type is required" })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="weight_loss">{WEIGHT_LOSS}</option>
            <option value="workout_per_week">Workout Per Week</option>
          </select>
          {errors.goal_type && <p className="text-red-500 text-sm">{errors.goal_type.message}</p>}
        </div>

        <div>
          <label htmlFor="target_value" className="block text-gray-700 font-medium">
            {TARGET_VALUE}
          </label>
          <input
            type="number"
            inputMode="numeric"
            id="target_value"
            placeholder="0"
            {...register("target_value", { 
              required: "Target value is required", 
              validate: (value) => Number(value) > 0 || "Target value must be greater than 0"
            })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.target_value && <p className="text-red-500 text-sm">{errors.target_value.message}</p>}
        </div>

        <div>
          <label htmlFor="current_progress" className="block text-gray-700 font-medium">
            {CURRENT_PROGRESS}
          </label>
          <input
            type="number"
            id="current_progress"
            placeholder="0"
            {...register("current_progress", { 
              required: "Current progress is required", 
              valueAsNumber: true,
              validate: (value) => value > 0 || "Current progress must be greater than 0"
            })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.current_progress && <p className="text-red-500 text-sm">{errors.current_progress.message}</p>}
        </div>

        <div>
          <label htmlFor="start_date" className="block text-gray-700 font-medium">
            {START_DATE}
          </label>
          <input
            type="date"
            id="start_date"
            {...register("start_date", { required: "Start date is required" })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-gray-700 font-medium">
            {END_DATA}
          </label>
          <input
            type="date"
            id="end_date"
            {...register("end_date", { 
              required: "End date is required",
              validate: (value) => {
                const startDate = watch("start_date");
                if (startDate && new Date(value) < new Date(startDate)) {
                  return "End date cannot be less than start date";
                }
                return true;
              }
            })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium">
            {STATUS}
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">{PENDING}</option>
            <option value="complete">{COMPLETE}</option>
            <option value="incomplete">{INCOMPLETE}</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition">
          {id !== null ? UPDATE_GOAL : ADD_GOAL}
        </button>

        <button
          onClick={handleBack}
          type="button"
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-md transition duration-200"
        >
          {BACK_TO_DASHBOARD}
        </button>
      </form>
    </div>
  );
};

export default FitnessFormPage;
