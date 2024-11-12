import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axiosInstance from "../api/axiosInstance";
import { Card } from "antd";
import { Spin } from "antd";

const Dashboard = () => {
  const { user } = useUserContext();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchPredictions = async () => {
        try {
          const response = await axiosInstance.get(
            `/predictions/${user.username}`
          );
          setPredictions(response.data.predictions);
        } catch (err) {
          setError("Error fetching predictions");
        } finally {
          setLoading(false);
        }
      };

      fetchPredictions();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" />
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
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 text-white h-64 p-10 rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Your Prediction History
        </h1>
        <p className="text-lg md:text-xl text-gray-100">
          Review your job placement predictions over time.
        </p>
      </div>

      {/* Predictions Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        {predictions.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No predictions found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {predictions.map((prediction, index) => (
              <Card
                key={index}
                title={
                  <span className="text-xl font-semibold text-blue-600">
                    Prediction {index + 1}
                  </span>
                }
                bordered={false}
                className="shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #f0f0f0",
                }}
              >
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>10th Percentage:</strong>{" "}
                    {prediction.ssc_percentage}
                  </p>
                  <p>
                    <strong>12th Percentage:</strong>{" "}
                    {prediction.hsc_percentage}
                  </p>
                  <p>
                    <strong>Degree Percentage:</strong>{" "}
                    {prediction.degree_percentage}
                  </p>
                  <p>
                    <strong>Employment Test %:</strong>{" "}
                    {prediction.emp_test_percentage}
                  </p>
                  <p>
                    <strong>MBA Percentage:</strong> {prediction.mba_percent}
                  </p>
                  <p>
                    <strong>Result: </strong>
                    <span
                      className={`font-bold ${
                        prediction.prediction_result === "Placed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {prediction.prediction_result}
                    </span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 text-center shadow-md mt-auto">
        <p className="text-gray-600 text-sm md:text-base">
          © 2023 JobPredict. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-8">
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

export default Dashboard;
