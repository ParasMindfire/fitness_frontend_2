import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import {  
  NAVBAR_TITLE,  
  WORKOUTS,  
  FITNESS_GOALS_TITLE,
  VIEW_WORKOUTS,  
  ADD_WORKOUT_TITLE,  
  VIEW_FITNESS_GOALS,  
  ADD_FITNESS_GOAL_TITLE, 
  LOGOUT_BUTTON,  
  LOGIN_BUTTON,  
  SIGNUP_BUTTON,
} from "../constants";
import { fetchSteak, fetchWorkoutDates } from "../services/WorkoutAPI";
import { useWorkout } from "../contexts/WorkoutContext";
import { Workout } from "../interfaces/WorkoutInterface";

const Navbar: React.FC = () => {
  const { user, setUser } = useUserContext();
  const { workouts } = useWorkout();
  const navigate = useNavigate();

  const [streak, setStreak] = useState<number>(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [workoutDates, setWorkoutDates] = useState<Workout[]>([]);

  useEffect(() => {
    if (user) {
      const fetchStreak = async () => {
        const currStreak: number | { streak: number } = await fetchSteak();
        console.log("Fetched Streak:", currStreak);
        setStreak(typeof currStreak === "object" ? currStreak.streak : currStreak);
      };

      const fetchDates = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
      
        const allDates: Workout[] = await fetchWorkoutDates(year, month);
        const filteredDates = allDates.filter(workout => {
          const workoutMonth = new Date(workout.workout_date).getMonth() + 1;
          return workoutMonth === month;
        });
      
        setWorkoutDates(filteredDates);
      };
      

      fetchStreak();
      fetchDates();
    }
  }, [user, workouts]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser("");
    navigate("/login");
  };

  const getCurrentMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">{NAVBAR_TITLE}</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {WORKOUTS}
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/workoutViews" className="block px-4 py-2 hover:bg-gray-200">
                    {VIEW_WORKOUTS}
                  </Link>
                  <Link to="/workoutFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    {ADD_WORKOUT_TITLE}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {FITNESS_GOALS_TITLE}
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block">
                  <Link to="/fitnessViews" className="block px-4 py-2 hover:bg-gray-200">
                    {VIEW_FITNESS_GOALS}
                  </Link>
                  <Link to="/fitnessFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    {ADD_FITNESS_GOAL_TITLE}
                  </Link>
                </div>
              </div>

              <div className="relative group">
                  <button
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
                  >
                    Calendar
                  </button>
                    {isCalendarOpen && (
                      <div
                        className="absolute top-full mt-5 bg-white rounded-lg shadow-lg p-4 w-96 z-10"
                        style={{ right: "-100px" }}
                      >
                        <button
                          onClick={() => setIsCalendarOpen(false)}
                          className="absolute top-2 right-2 text-red-500 font-bold"
                        >
                          X
                        </button>
                        <h2 className="text-xl font-bold text-center mb-4">Workout Calendar</h2>
                        <div className="grid grid-cols-7 gap-2">
                          {getCurrentMonthDays().map((day) => {
                            const dateStr = day.toLocaleDateString("en-CA");
                            const isWorkoutDay = workoutDates.some(
                              (workout) => workout.workout_date === dateStr
                            );
                            const isFutureDate = day > new Date();
                            const workoutCount = workoutDates.filter(
                              (workout) => workout.workout_date === dateStr
                            ).length;

                            return (
                              <div
                                key={dateStr}
                                className={`w-10 h-10 flex items-center justify-center rounded-full 
                                  ${isFutureDate
                                    ? "bg-gray-400 text-white"
                                    : workoutCount > 1
                                      ? "bg-yellow-400 text-white"
                                      : isWorkoutDay
                                        ? "bg-green-400 text-white"
                                        : "bg-red-400 text-white"}`}
                              >
                                {day.getDate()}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
</div>



              <div className="text-white px-4 py-2 rounded-lg bg-green-500">
                Streak: {streak} days
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                  {user && user.name ? user.name : "Profile"}
                </button>
                <div className="absolute right-1 hidden bg-white text-black shadow-lg rounded-lg min-w-32 group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    {LOGOUT_BUTTON}
                   </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                {LOGIN_BUTTON}
              </Link>
              <Link to="/signup" className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg">
                {SIGNUP_BUTTON}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
