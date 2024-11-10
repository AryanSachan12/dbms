import React from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import './NavBar.css'; // Import additional styles if needed

const NavBar = () => {
  const { user, clearUserData } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserData();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg z-50">
      <div className="text-4xl font-extrabold text-white">JobPredict</div>
      <nav className="space-x-6 text-lg">
        <a href="/" className="text-white hover:text-yellow-400 transition duration-300">Home</a>
        <a href="/about" className="text-white hover:text-yellow-400 transition duration-300">About</a>
        <a href="/predictions" className="text-white hover:text-yellow-400 transition duration-300">Predictions</a>
        <a href="/contact" className="text-white hover:text-yellow-400 transition duration-300">Contact</a>
        
        {user && (
          <a href="/dashboard" className="text-white hover:text-yellow-400 transition duration-300">Dashboard</a>
        )}

        {!user ? (
          <>
            <a href="/signin" className="text-white hover:text-yellow-400 transition duration-300">Sign In</a>
            <a href="/register" className="text-white hover:text-yellow-400 transition duration-300">Sign Up</a>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">Welcome, {user.username}</span>
            <Button onClick={handleLogout} type="link" className="text-white hover:text-yellow-400">
              Logout
            </Button>
          </div>
        )}
      </nav>
      <Input.Search
        placeholder="Search jobs..."
        style={{ width: 350, borderRadius: '25px', border: '1px solid white' }}
        enterButton={<Button type="primary" className="text-lg rounded-full">Search</Button>}
        className="rounded-full"
      />
    </header>
  );
};

export default NavBar;