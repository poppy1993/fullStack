import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const BasicInfo = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // handle request
  };
  return (
    <Form
      name="basic_info"
      className="basic-info-form"
      initialValues={{
        username: 'AlbertBird',
        email: 'xxxx',
        phone: '12345',
        account: 'aaaaa'
      }}
      {...formItemLayout}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="User Name"
        labelAlign='right'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        labelAlign='right'
      >
        <Input
          disabled
        />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        labelAlign='right'
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        name="account"
        label="Facebook Account"
        labelAlign='right'
      >
        <Input placeholder="Facebook Account" />
      </Form.Item>
      <Form.Item wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}>
        <Button type="primary" htmlType="submit" className="save-btn">
            Save Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicInfo;