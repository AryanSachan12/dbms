import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, notification, Row, Col } from 'antd';
import axiosInstance from '../api/axiosInstance';

const Prediction = () => {
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePrediction = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/placement_prediction", values);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Card 
        title="Job Placement Prediction" 
        className="w-full max-w-lg shadow-xl rounded-lg border-2 border-gray-200"
        style={{ background: '#f9f9f9' }}
      >
        <Form layout="vertical" onFinish={handlePrediction}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="SSC Percentage" name="ssc_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter SSC percentage" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSC Percentage" name="hsc_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter HSC percentage" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Degree Percentage" name="degree_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter Degree percentage" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Employment Test Percentage" name="emp_test_percentage" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter Employment Test percentage" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="MBA Percentage" name="mba_percent" rules={[{ required: true }]}>
                <Input type="number" placeholder="Enter MBA percentage" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Select Gender">
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="SSC Board" name="ssc_board" rules={[{ required: true }]}>
                <Select placeholder="Select SSC Board">
                  <Select.Option value="Central">Central</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="HSC Board" name="hsc_board" rules={[{ required: true }]}>
                <Select placeholder="Select HSC Board">
                  <Select.Option value="Central">Central</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="HSC Subject" name="hsc_subject" rules={[{ required: true }]}>
                <Select placeholder="Select HSC Subject">
                  <Select.Option value="Commerce">Commerce</Select.Option>
                  <Select.Option value="Science">Science</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Undergrad Degree" name="undergrad_degree" rules={[{ required: true }]}>
                <Select placeholder="Select Undergrad Degree">
                  <Select.Option value="Comm_Mgmt">Commerce/Management</Select.Option>
                  <Select.Option value="Sci_Tech">Science/Technology</Select.Option>
                  <Select.Option value="Others">Others</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Work Experience" name="work_experience" rules={[{ required: true }]}>
                <Select placeholder="Select Work Experience">
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Specialisation" name="specialisation" rules={[{ required: true }]}>
                <Select placeholder="Select Specialisation">
                  <Select.Option value="Mkt_Fin">Marketing and Finance</Select.Option>
                  <Select.Option value="Mkt_HR">Marketing and HR</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block
              style={{
                backgroundColor: 'text-blue-600', 
                borderColor: '#4CAF50', 
                fontSize: '16px', 
                fontWeight: 'bold'
              }}
            >
              Predict Placement
            </Button>
          </Form.Item>
        </Form>

        {predictionResult && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Prediction Result: {predictionResult}</h2>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Prediction;
