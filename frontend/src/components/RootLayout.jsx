import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'; // Import the NavBar component

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar should be present on every page */}
      <NavBar />
      {/* The Outlet renders the page-specific content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
