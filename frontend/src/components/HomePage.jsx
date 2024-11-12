import React from "react";
import { Button, Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const jobTrendData = [
  { month: "Jan", Software: 100, Data: 80, Marketing: 70 },
  { month: "Feb", Software: 120, Data: 85, Marketing: 75 },
  { month: "Mar", Software: 140, Data: 90, Marketing: 80 },
  { month: "Apr", Software: 160, Data: 95, Marketing: 82 },
  { month: "May", Software: 170, Data: 100, Marketing: 85 },
  { month: "Jun", Software: 180, Data: 105, Marketing: 88 },
];

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white h-[90vh] p-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4 leading-tight">
          Discover Your Career Path
        </h1>
        <p className="text-2xl mb-8 max-w-2xl">
          Using AI and machine learning to guide you through the latest job
          trends and opportunities in your field.
        </p>
        <Link
          to="/predictions"
          className="text-lg py-3 px-10 rounded-full shadow-md hover:shadow-xl transition duration-300 bg-blue-500 hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
        {[
          {
            title: "AI-Powered Predictions",
            description:
              "Insights driven by AI to understand job market trends.",
          },
          {
            title: "Interactive Visualizations",
            description: "Explore trends with stunning, interactive visuals.",
          },
          {
            title: "Real-Time Updates",
            description: "Stay updated with the latest in your chosen fields.",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            title={
              <span className="text-2xl font-semibold text-gray-800">
                {feature.title}
              </span>
            }
            bordered={false}
            className="shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 rounded-xl"
          >
            <p className="text-gray-600 text-lg">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Job Trends Visualization */}
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Explore Current Job Trends
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          See how different job roles are evolving in real-time.
        </p>
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={jobTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Software"
                stroke="#8884d8"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="Data"
                stroke="#82ca9d"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="Marketing"
                stroke="#ffc658"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "This app transformed my career journey!",
              author: "Alice, Software Engineer",
            },
            {
              quote: "An essential tool for job seekers and career planners.",
              author: "Bob, Data Analyst",
            },
          ].map((testimonial, index) => (
            <blockquote
              key={index}
              className="p-8 border-l-4 border-blue-500 bg-white shadow-md rounded-xl"
            >
              <p className="text-2xl text-gray-800">"{testimonial.quote}"</p>
              <footer className="mt-4 text-gray-600 text-right">
                - {testimonial.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 text-center shadow-t">
        <p className="text-gray-700 mb-6 text-lg font-medium">
          © 2023 JobPredict. All Rights Reserved.
        </p>
        <div className="space-x-6 text-lg">
          <a
            href="/privacy"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="/terms"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
