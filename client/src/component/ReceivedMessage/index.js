import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';

const columns = [
  {
    title: 'User',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Operation',
    dataIndex: '',
    key: 'operation',
    render: (_, record) => (
      <Space size="middle">
        <a>View</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    username: 'John Brown',
    time: '2020-08-06  12:35:24',
    status: 'Unread',
    content: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    username: 'Jim Green',
    time: '2020-08-06  12:35:24',
    status: 'Unread',
    content: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    username: 'Not Expandable',
    time: '2020-08-06  12:35:24',
    status: 'Unread',
    content: 'This not expandable',
  },
  {
    key: 4,
    username: 'Joe Black',
    time: '2020-08-06  12:35:24',
    status: 'Unread',
    content: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
const ReceivedMessage = () => (
  <Table
    columns={columns}
    dataSource={data}
  />
);
export default ReceivedMessage;