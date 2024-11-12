import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, notification, Row, Col } from 'antd';
import axiosInstance from '../api/axiosInstance';
import { useUserContext } from '../context/UserContext'; // Import the user context

const Prediction = () => {
  const { user } = useUserContext(); // Access the user data from context
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePrediction = async (values) => {
    if (!user) {
      notification.error({
        message: "User not logged in",
        description: "Please log in to make a prediction.",
      });
      return;
    }

    setLoading(true);
    try {
      // Include the username and user_id in the prediction request
      const response = await axiosInstance.post("/placement_prediction", {
        ...values, // Spread the form values
        user_id: user.id, // Add the user_id from the context
        username: user.username, // Add the username from the context
      });
      setPredictionResult(response.data.prediction);
      notification.success({
        message: "Prediction Success",
        description: `Prediction Result: ${response.data.prediction}`,
      });
    } catch (error) {
      notification.error({
        message: "Prediction Error",
        description: "Failed to retrieve prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center py-12 px-4">
      <Card
        title={<h2 className="text-3xl font-bold text-center text-blue-700">Job Placement Prediction</h2>}
        className="w-full max-w-3xl shadow-2xl rounded-2xl border border-gray-200 overflow-hidden"
        style={{ backgroundColor: '#f9f9f9', padding: '20px' }}
      >
        <Form layout="vertical" onFinish={handlePrediction} className="space-y-6">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="SSC Percentage" name="ssc_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter SSC percentage" className="rounded-lg py-2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSC Percentage" name="hsc_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter HSC percentage" className="rounded-lg py-2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="Degree Percentage" name="degree_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter Degree percentage" className="rounded-lg py-2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Employment Test Percentage" name="emp_test_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter Employment Test percentage" className="rounded-lg py-2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="MBA Percentage" name="mba_percent" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter MBA percentage" className="rounded-lg py-2" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Select Gender" className="rounded-lg">
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="SSC Board" name="ssc_board" rules={[{ required: true }]}>
                <Select placeholder="Select SSC Board" className="rounded-lg">
                  <Select.Option value="Central">Central</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSC Board" name="hsc_board" rules={[{ required: true }]}>
                <Select placeholder="Select HSC Board" className="rounded-lg">
                  <Select.Option value="Central">Central</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="HSC Subject" name="hsc_subject" rules={[{ required: true }]}>
                <Select placeholder="Select HSC Subject" className="rounded-lg">
                  <Select.Option value="Commerce">Commerce</Select.Option>
                  <Select.Option value="Science">Science</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Undergrad Degree" name="undergrad_degree" rules={[{ required: true }]}>
                <Select placeholder="Select Undergrad Degree" className="rounded-lg">
                  <Select.Option value="Comm_Mgmt">Commerce/Management</Select.Option>
                  <Select.Option value="Sci_Tech">Science/Technology</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="Work Experience" name="work_experience" rules={[{ required: true }]}>
                <Select placeholder="Select Work Experience" className="rounded-lg">
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Specialisation" name="specialisation" rules={[{ required: true }]}>
                <Select placeholder="Select Specialisation" className="rounded-lg">
                  <Select.Option value="Mkt_Fin">Marketing and Finance</Select.Option>
                  <Select.Option value="Mkt_HR">Marketing and HR</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 text-lg py-2 px-4 font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
              style={{ borderColor: '#4CAF50' }}
            >
              Predict Placement
            </Button>
          </Form.Item>
        </Form>

        {predictionResult && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-700">Prediction Result: {predictionResult}</h2>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Prediction;
