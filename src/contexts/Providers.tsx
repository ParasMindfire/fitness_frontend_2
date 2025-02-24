// Providers.js

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { WorkoutProvider } from "./WorkoutContext";
import { FitnessProvider } from "./FitnessContext";
import { ReactNode } from "react";

// A single provider wrapper component that includes all context and routing
const Providers:React.FC<{children:ReactNode}>= ({ children }) => {
  return (
    <FitnessProvider>
      <WorkoutProvider>
        <UserProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </UserProvider>
      </WorkoutProvider>
    </FitnessProvider>
  );
};

export default Providers;
