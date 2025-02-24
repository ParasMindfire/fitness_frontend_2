import React from "react";
import { Routes,Route } from 'react-router-dom'

// Importing the pages to be routed
import Landing from "../pages/LandingPage/Landing";
import Signup from "../pages/AuthPages/Signup";
import Login from "../pages/AuthPages/Login";
import WorkoutFormPage from "../pages/WrokoutPages/WorkoutFormPage";
import WorkoutViews from "../pages/WrokoutPages/WorkoutViews";
import { WorkoutCaloriesStats } from "../pages/StatsPages/WorkoutCalorieStat";
import { WorkoutDurationStats } from "../pages/StatsPages/WorkoutDurationStat";
import FitnessFormPage from "../pages/FitnessPages/FitnessFormPage";
import FitnessViews from "../pages/FitnessPages/FitnessViews";
import ProfilePage from "../pages/ProfilePage/Profile";


// Home component handles routing for the application
export const Home:React.FC=()=>{
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workoutFormPage" element={<WorkoutFormPage />} />
            <Route path="/workoutViews" element={<WorkoutViews />} />
            <Route path="/fitnessFormPage" element={<FitnessFormPage />} />
            <Route path="/fitnessViews" element={<FitnessViews />} />
            <Route path="/calories" element={<WorkoutCaloriesStats />} />
            <Route path="/durations" element={<WorkoutDurationStats />} />
            <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    )
}
