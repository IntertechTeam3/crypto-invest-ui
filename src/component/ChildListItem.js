import React from "react";
import "antd/dist/antd.css";
import { Space, Table, Tag } from "antd";

const ChildsListItem = (props) => {
  const { childsArray } = props;

  console.log("child:", childsArray);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Surname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Address",
      dataIndex: "addresses",
      key: "addresses",
    },
    {
      title: "Access Date",
      dataIndex: "accessDateTimeStamp",
      key: "accessDateTimeStamp",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirthTimeStamp",
      key: "dateOfBirthTimeStamp    ",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      width: 1,
      render: () => {
        return <button>Withdraw</button>;
      },
    },
    {
      width: 1,
      render: () => {
        return <button>Send</button>;
      },
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return <Table columns={columns} dataSource={childsArray || []} />;
};

export default ChildsListItem;
