import React from 'react';
import { Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const HomePage = () => {
  const { user, setUserData } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData(null); 
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-3xl font-extrabold text-blue-600">JobPredict</div>
        <nav className="space-x-6 text-lg">
          <a href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</a>
          <a href="/predictions" className="text-gray-700 hover:text-blue-600 transition duration-300">Predictions</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</a>

          {!user ? (
            <>
              <a href="/signin" className="text-gray-700 hover:text-blue-600 transition duration-300">Sign In</a>
              <a href="/register" className="text-gray-700 hover:text-blue-600 transition duration-300">Sign Up</a>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-semibold">Welcome, {user.username}</span>
              <Button onClick={handleLogout} type="link" className="text-gray-700 hover:text-blue-600">
                Logout
              </Button>
            </div>
          )}
        </nav>
        <Input.Search
          placeholder="Search jobs..."
          style={{ width: 350 }}
          enterButton={<Button type="primary" className="text-lg">Search</Button>}
          className="rounded-full"
        />
      </header>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white h-80 p-10 rounded-b-3xl">
        <h1 className="text-5xl font-extrabold mb-4">Predict Your Future Job Trends Today</h1>
        <p className="text-xl mb-6">Utilizing cutting-edge machine learning to analyze job market trends and opportunities.</p>
        <Button type="primary" className="text-lg py-3 px-8 rounded-full shadow-md hover:shadow-xl transition duration-300">Get Started</Button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {["AI-Powered Predictions", "Data Visualization", "Real-Time Updates"].map((feature, index) => (
          <Card
            key={index}
            title={<span className="text-xl font-semibold text-gray-800">{feature}</span>}
            bordered={true}
            className="shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <p className="text-gray-600">Get insights into the job market based on current trends.</p>
          </Card>
        ))}
      </div>

      {/* Job Trends Visualization */}
      <div className="max-w-6xl mx-auto py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Current Job Trends</h2>
        <p className="text-lg text-gray-600 mb-6">Explore the latest jobs being created and their demand in the market.</p>
        <div className="bg-gray-200 h-72 rounded-xl shadow-md flex items-center justify-center mb-6">
          <p className="text-gray-500">Graph / Chart Placeholder</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            { quote: "This app helped me to find a job that I never knew existed!", author: "Alice, Software Engineer" },
            { quote: "The insights provided here are invaluable to my career planning.", author: "Bob, Data Analyst" },
          ].map((testimonial, index) => (
            <blockquote key={index} className="p-6 border-l-4 border-blue-500 bg-white shadow-lg rounded-xl">
              <p className="text-xl text-gray-800">"{testimonial.quote}"</p>
              <footer className="mt-4 text-gray-600">- {testimonial.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 text-center shadow-md">
        <p className="text-gray-600 mb-4">© 2023 JobPredict. All Rights Reserved.</p>
        <div className="space-x-6">
          <a href="/privacy" className="text-gray-700 hover:text-blue-600 transition duration-300">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="text-gray-700 hover:text-blue-600 transition duration-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;