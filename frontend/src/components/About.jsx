import React from 'react';
import { Card, Col, Row, Typography, List } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="about-container bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Title level={1} className="text-center mb-6">
          About Our Job Placement Prediction System
        </Title>

        <Paragraph className="text-center text-lg text-gray-600 mb-10">
          Welcome to our platform, where we help users predict their chances of being placed in a job based on various academic and personal factors. 
          Using machine learning techniques, we predict the likelihood of job placement and give valuable insights into improving career prospects. 
          Our application is powered by a React frontend, FastAPI backend, and a machine learning model built using Logistic Regression.
        </Paragraph>

        <Row gutter={[16, 16]} className="mb-12">
          <Col span={12}>
            <Card title="Tech Stack" bordered={false} className="shadow-lg">
              <p><strong>Frontend:</strong> React, Ant Design</p>
              <p><strong>Backend:</strong> FastAPI</p>
              <p><strong>Machine Learning:</strong> Logistic Regression</p>
              <p><strong>Database:</strong> MySQL</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="How It Works" bordered={false} className="shadow-lg">
              <Title level={4}>Step 1: Data Collection</Title>
              <Paragraph>
                Users provide personal and academic details such as high school grades, undergraduate percentages, test scores, and work experience.
              </Paragraph>

              <Title level={4}>Step 2: Data Processing</Title>
              <Paragraph>
                The backend, powered by FastAPI, processes this data, using label encoding for categorical features to prepare it for machine learning.
              </Paragraph>

              <Title level={4}>Step 3: Prediction</Title>
              <Paragraph>
                Using the Logistic Regression model, we predict whether the user is likely to be placed in a job based on their provided data. The prediction is then stored for future reference.
              </Paragraph>

              <Title level={4}>Step 4: Result Storage</Title>
              <Paragraph>
                The results of each prediction, along with the input data, are stored in the database linked to the user’s username for easy retrieval.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <div className="mt-10">
          <Title level={2} className="text-center mb-6">
            Key Technologies and Features
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card
                title="React & Ant Design"
                bordered={false}
                className="shadow-lg"
              >
                <Paragraph>
                  The frontend interface is built using React and Ant Design components, creating a responsive and user-friendly platform where users can input their data.
                </Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="FastAPI Backend"
                bordered={false}
                className="shadow-lg"
              >
                <Paragraph>
                  FastAPI handles our backend, ensuring high performance and quick response times for data processing and prediction retrieval.
                </Paragraph>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="Logistic Regression Model"
                bordered={false}
                className="shadow-lg"
              >
                <Paragraph>
                  We use a Logistic Regression model, trained on historical placement data, to predict job placement status based on user input.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="mt-10">
          <Title level={2} className="text-center mb-6">
            Machine Learning Model: Logistic Regression
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-6">
            At the heart of our platform is a machine learning model built using Logistic Regression. This model is trained on historical data of past job seekers to determine the probability of placement based on a user's profile. 
            The key factors used for prediction include academic performance, test scores, work experience, and specialization, among others.
          </Paragraph>
          <List
            bordered
            dataSource={[
              "Academic performance (e.g., SSC, HSC, degree percentages)",
              "Test scores (e.g., employment test scores, MBA percent)",
              "Work experience (e.g., previous job experience)",
              "Specialization (e.g., Marketing, Finance, HR)"
            ]}
            renderItem={(item) => (
              <List.Item>{item}</List.Item>
            )}
          />
        </div>

        {/* <div className="mt-10 text-center">
          <Title level={3}>Our Mission</Title>
          <Paragraph>
            Our goal is to provide job seekers with predictive insights into their career prospects. With this information, individuals can make more informed decisions regarding their job search and career planning.
          </Paragraph>
          <Paragraph>
            By leveraging machine learning, we strive to make job placement predictions as accurate and actionable as possible, empowering users to take charge of their professional future.
          </Paragraph>
        </div> */}
      </div>
    </div>
  );
};

export default About;
