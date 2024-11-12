import React from 'react';
import { Form, Input, Button, Typography, Card, Col, Row } from 'antd';

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  return (
    <div className="contact-container bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-6 text-blue-700 font-bold text-4xl">
          Contact Us
        </h1>

        <Paragraph className="text-center text-lg text-gray-600 mb-10">
          If you have any questions or would like to get in touch with us, please feel free to reach out. 
          We would love to hear from you!
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Card title="Contact Form" bordered={false} className="shadow-lg">
              <Form
                layout="vertical"
                name="contactForm"
                initialValues={{
                  name: '',
                  college: '',
                  email: '',
                  phone: ''
                }}
                onFinish={(values) => console.log('Form submitted:', values)}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label="College / University"
                  name="college"
                  rules={[{ required: true, message: 'Please enter your college/university!' }]}
                >
                  <Input placeholder="XYZ University" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                  <Input placeholder="+1 (555) 123-4567" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                  <Input placeholder="johndoe@example.com" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col span={24} md={12}>
            <Card title="Project Team" bordered={false} className="shadow-lg">
              <Title level={4}>Team Members:</Title>
              <Paragraph>
                <strong>1. Aryan Sachan</strong><br />
                College: University School of Automation and Robotics<br />
                Email: aryansachan2004@gmail.com<br />
                Phone: +1 (91) 9625895488
              </Paragraph>
              <Paragraph>
                <strong>2. Utkarsh Chauhan</strong><br />
                College: University School of Automation and Robotics<br />
                Email: utkarshchauhan4868@gmail.com<br />
                Phone: +1 (91) 9368753494
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <div className="mt-12 text-center">
          <Card bordered={false} className="shadow-lg">
            <Title level={3}>Acknowledgements</Title>
            <Paragraph>
              We would like to extend our heartfelt thanks to our teacher, Prof. Renu Dalal, for her continuous support and guidance throughout the project. 
              Her expertise and advice were invaluable in bringing this project to fruition.
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
