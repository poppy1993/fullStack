import React, { useEffect, useState } from 'react';
import { Table, Space, Image } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Picture',
    dataIndex: 'picture',
    key: 'picture',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'SubType',
    dataIndex: 'subType',
    key: 'subType',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Operation',
    dataIndex: '',
    key: 'operation',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    picture: (
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
    type: 1,
    subType: 2,
    time: '2020-08-06  12:35:24',
  },
  {
    key: 2,
    name: 'Jim Green',
    picture: (
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
    type: 1,
    subType: 2,
    time: '2020-08-06  12:35:24',
  },
  {
    key: 3,
    name: 'Not Expandable',
    picture: (
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
    type: 1,
    subType: 2,
    time: '2020-08-06  12:35:24',
  },
  {
    key: 4,
    name: 'Joe Black',
    picture: (
      <Image
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ),
    type: 1,
    subType: 2,
    time: '2020-08-06  12:35:24',
  },
];
const ReceivedMessage = () => (
  <Table
    columns={columns}
    dataSource={data}
  />
);
export default ReceivedMessage;