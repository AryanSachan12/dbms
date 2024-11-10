import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext"; // Assuming you have this context set up
import axiosInstance from "../api/axiosInstance"; // Adjust according to your axios setup
import { Card } from "antd";

const Dashboard = () => {
  const { user } = useUserContext(); // Get current user from context
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch predictions if user is available
    if (user) {
      const fetchPredictions = async () => {
        try {
          const response = await axiosInstance.get(`/predictions/${user.username}`);
          setPredictions(response.data.predictions);
        } catch (err) {
          setError("Error fetching predictions");
        } finally {
          setLoading(false);
        }
      };

      fetchPredictions();
    }
  }, [user]); // Runs when the user object changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading predictions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white h-80 p-10 rounded-b-3xl">
        <h1 className="text-5xl font-extrabold mb-4">Your Prediction History</h1>
        <p className="text-xl mb-6">Explore past job placement predictions based on your data.</p>
      </div>

      {/* Predictions Section */}
      <div className="max-w-6xl mx-auto py-16">
        {predictions.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No predictions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {predictions.map((prediction, index) => (
              <Card
                key={index}
                title={<span className="text-xl font-semibold text-gray-800">Prediction {index + 1}</span>}
                bordered={true}
                className="shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <div className="space-y-4">
                  <p><strong>SSC Percentage:</strong> {prediction.ssc_percentage}</p>
                  <p><strong>HSC Percentage:</strong> {prediction.hsc_percentage}</p>
                  <p><strong>Degree Percentage:</strong> {prediction.degree_percentage}</p>
                  <p><strong>Emp Test Percentage:</strong> {prediction.emp_test_percentage}</p>
                  <p><strong>MBA Percent:</strong> {prediction.mba_percent}</p>
                  <p><strong>Prediction Result:</strong> {prediction.prediction_result}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
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

export default Dashboard;
