import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Providers from '../contexts/Providers';
import { ToastContainer } from 'react-toastify';


//Wraps the whole app contains container , toasts and navbar
const Layout: React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <div className="min-h-screen p-0 m-0 box-border">
      <Providers>
        <Navbar/>
        <ToastContainer/>
          {children}
      </Providers>
    </div>
  );
};

export default Layout;
