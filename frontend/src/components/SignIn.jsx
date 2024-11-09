import React, { useState } from 'react';
import { Input, Button, notification, Form } from 'antd';
import { useUserContext } from '../context/UserContext'; // Import the useUserContext hook
import axiosInstance from '../api/axiosInstance'; // Import the Axios instance
import { useNavigate } from 'react-router-dom';  // Import useNavigate to handle navigation

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useUserContext();  // Get the setUserData function from the context
  const navigate = useNavigate(); // Navigate for redirection after login

  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      const response = await axiosInstance.post('/users/login', { username, password });

      // Store the user data in context after successful login
      setUserData(response.data);  // Save the user data to context

      notification.success({
        message: 'Success',
        description: `Welcome back, ${response.data.username}!`,
      });

      // Redirect the user to the dashboard (or any other page)
      navigate('/');  // Adjust the path as needed
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.detail || 'Invalid username or password',
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Sign In</h2>
        <Form
          onFinish={handleLogin}  // onFinish is called when form validation passes
          initialValues={{ username, password }}
          className="space-y-6"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]} // Username validation
          >
            <Input
              placeholder="Username"
              className="w-full py-4 px-6 rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]} // Password validation
          >
            <Input.Password
              placeholder="Password"
              className="w-full py-4 px-6 rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button
            type="primary"
            block
            className="py-4 rounded-full text-lg font-semibold transition duration-300 hover:shadow-lg"
            htmlType="submit" // Use htmlType="submit" for form submission
          >
            Sign In
          </Button>
        </Form>
        <div className="mt-6 text-center">
          <a href="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
            Don't have an account? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
