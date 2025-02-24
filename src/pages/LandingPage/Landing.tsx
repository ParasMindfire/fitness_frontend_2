import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import {
  NAVBAR_TITLE,
  PERSONAL_TRACKER,
  ALREADY_A_USER,
  LOGIN_BUTTON,
  SIGNUP_BUTTON,
} from "../../constants";
import UserGoals from "../../components/UserGoalComponent";
import AnimatedQuotes from "../../components/AnimatedComponent";

const Landing: React.FC = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Upper Section: Animated Quotes */}
      <div className="h-32 bg-red-900 flex items-center justify-center">
        <AnimatedQuotes />
      </div>

      {/* Middle Section */}
      <div className="flex-1 bg-gray-200 p-4">
        {user ? (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Left Column: User Goals */}
            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Your Goals</h2>
              <UserGoals />
            </div>
            {/* Right Column: AI Chatbot Placeholder */}
            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Chat with AI</h2>
              <div className="text-gray-600">
                {/* Placeholder for AI chatbot */}
                <p>Coming Soon...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">{NAVBAR_TITLE}</h2>
            <p className="text-gray-600 mt-2">{PERSONAL_TRACKER}</p>
            <div className="mt-6">
              <Link to="/signup">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-2">
                  {SIGNUP_BUTTON}
                </button>
              </Link>
              <p className="text-gray-500 mt-2">{ALREADY_A_USER}</p>
              <Link to="/login">
                <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg m-2">
                  {LOGIN_BUTTON}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
