import React from "react";
import { Input, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  const { user, clearUserData } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg z-50 px-8 py-4 flex items-center justify-between min-h-20">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white cursor-pointer hover:text-yellow-300 transition-colors duration-200"
      >
        JobPredict
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-4 text-lg font-medium">
        <a
          href="/"
          className="text-white hover:text-yellow-300 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-white hover:text-yellow-300 transition-colors duration-300"
        >
          About
        </a>
        <a
          href="/predictions"
          className="text-white hover:text-yellow-300 transition-colors duration-300"
        >
          Predictions
        </a>
        <a
          href="/contact"
          className="text-white hover:text-yellow-300 transition-colors duration-300"
        >
          Contact
        </a>
      </nav>

      {/* Right Side - Search and User Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        {/* <Input.Search
          placeholder="Search jobs..."
          className="rounded-full px-4 py-1.5 text-gray-700 bg-white border border-transparent focus:outline-none focus:ring focus:ring-blue-300"
          style={{ width: 250 }}
        /> */}

        {/* User Profile */}
        {user ? (
          <div className="flex items-center space-x-3">
            <a
              href="/dashboard"
              className="flex items-center px-3 py-1.5 bg-white bg-opacity-20 text-white font-semibold rounded-full hover:bg-opacity-30 transition-colors duration-300"
            >
              <span className="mr-2">👤</span>
              {user.username}
            </a>
            <button
              onClick={handleLogout}
              className="text-white hover:text-yellow-300 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <a
              href="/signin"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="text-white hover:text-yellow-300 transition-colors duration-300"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
