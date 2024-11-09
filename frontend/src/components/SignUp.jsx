import React, { useState } from 'react';
import { Input, Button, notification } from 'antd';
import axiosInstance from '../api/axiosInstance';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!username) {
      notification.warning({
        message: 'Validation Error',
        description: 'Username is required.',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      notification.warning({
        message: 'Validation Error',
        description: 'Please enter a valid email address.',
      });
      return false;
    }

    if (password.length < 6) {
      notification.warning({
        message: 'Validation Error',
        description: 'Password must be at least 6 characters long.',
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post('/users/register', { username, email, password });

      notification.success({
        message: 'Registration Successful',
        description: `Welcome, ${response.data.username}! Please sign in.`,
      });

      // Redirect to sign-in page or perform another action on successful signup
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.detail || 'Failed to register. Please try again.',
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Sign Up</h2>
        <form className="space-y-6">
          <Input
            placeholder="Username"
            className="w-full py-4 px-6 rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            className="w-full py-4 px-6 rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="Password"
            className="w-full py-4 px-6 rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            className="py-4 rounded-full text-lg font-semibold transition duration-300 hover:shadow-lg"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center">
          <a href="/signin" className="text-blue-500 hover:text-blue-700 font-semibold">Already have an account? Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
