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


const SendMessage = () => {
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
      {/* <Form.Item
        name="content"
        label="Content"
        labelAlign='right'
        rules={[
          {
            required: true,
            message: 'Please input Content!',
          },
        ]}
      >
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120 }}
          placeholder="can resize"
        />
      </Form.Item> */}
      <Form.Item
        name="username"
        label="UserName"
        labelAlign='right'
        rules={[
          {
            required: true,
            message: 'Please input Username!',
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}>
        <Button type="primary" htmlType="submit" className="save-btn">
            Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendMessage;