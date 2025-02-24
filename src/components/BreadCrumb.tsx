import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapping for display names
  const breadcrumbNameMap: Record<string, string> = {
    "": "Dashboard",
    signup: "Signup",
    login: "Login",
    workoutFormPage: "Workout Form",
    workoutViews: "Workout Views",
    fitnessFormPage: "Fitness Form",
    fitnessViews: "Fitness Views",
    calories: "Workout Calories",
    durations: "Workout Durations",
    profile: "Profile",
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-2 ml-5">
      <Link to="/" className="hover:text-purple-600 font-medium">Dashboard</Link>
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo} className="flex items-center">
            <ChevronRight className="w-3 h-3 mx-1 text-gray-500" />
            {isLast ? (
              <span className="text-purple-600 font-semibold">{breadcrumbNameMap[value] || value}</span>
            ) : (
              <Link to={routeTo} className="hover:text-purple-600">
                {breadcrumbNameMap[value] || value}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
