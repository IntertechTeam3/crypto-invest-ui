import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Space, Table, Tag } from "antd";

import Send from "./SendPopup";
import Withdraw from "./WithdrawPopup";

const ChildsListItem = (props) => {
  const { childsArray } = props;

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
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      width: 1,
      render: (_, record) => {
        return <Withdraw balance={record.balance} address={record.addresses} />;
      },
    },
    {
      width: 1,
      render: (_, record) => {
        return (
          <>
            <Send address={record.addresses} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        className="ant-table table-margin"
        size={"small"}
        columns={columns}
        dataSource={childsArray || []}
      />
    </>
  );
};

export default ChildsListItem;
