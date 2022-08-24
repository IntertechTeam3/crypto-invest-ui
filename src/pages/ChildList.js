import { React, useEffect, useState } from "react";
import "./ChildList.css";
import {
  getParent,
  getChildsFromParent,
  addChild,
  getChild,
} from "../shared/contractDeploy.js";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "antd/dist/antd.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import ChildsListItem from "../component/ChildListItem";
import dayjs from "dayjs";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ChildList = () => {
  const [childsArray, setChildsArray] = useState();

  const [dateOfBirth, setDateOfBirth] = useState();
  const [accessDateOfBirth, setAccessDateOfBirth] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success", values);
    console.log(values.childFirstName);
    addChild(
      values.childAddress,
      values.childFirstName,
      values.childLastName,
      dateOfBirth,
      accessDateOfBirth
    );
    getChild(values.childAddress);
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const loadChild = async () => {
      try {
        const res = await getChildsFromParent();
        setChildsArray(
          res.map((x) => ({
            ...x,
            balance: x.balance.toString(),
            accessDateTimeStamp: dayjs
              .unix(x.accessDateTimeStamp)
              .format("DD/MM/YYYY"),
            dateOfBirthTimeStamp: dayjs
              .unix(x.dateOfBirthTimeStamp)
              .format("DD/MM/YYYY"),
          }))
        );
        console.log(childsArray);
      } catch {
        console.log(console.error());
      }
    };
    loadChild();
  }, []);

  const onChangeDate = (date, dateString) => {
    let dateSplit = dateString.split("-");
    let dateSplitYear = parseInt(dateSplit[0]) + 18;
    dateSplit[0] = dateSplitYear.toString();
    const accessDateString = dateSplit.join("-");
    const birthDate = new Date(dateString);
    const accessDate = new Date(accessDateString);

    const timestampSecondsBirthDate = Math.floor(birthDate.getTime() / 1000);
    const timestampSecondsAccessDate = Math.floor(accessDate.getTime() / 1000);
    console.log(timestampSecondsBirthDate);
    console.log(timestampSecondsAccessDate);
    setDateOfBirth(timestampSecondsBirthDate);
    setAccessDateOfBirth(timestampSecondsAccessDate);
  };

  // Modaldaki alttaki iki buton kaldırılamadı.
  return (
    <div id="mainpage">
      <h1>
        {" "}
        <ins> CHİLDREN </ins>{" "}
      </h1>

      <table id="children">
        <div>
          <ChildsListItem childsArray={childsArray} />
        </div>
      </table>
      <div className="">
        <Button
          type="primary"
          style={{ textAlign: "center" }}
          onClick={showModal}
        >
          +
        </Button>

        <Modal
          title="Add Children"
          visible={isModalVisible}
          footer={null}
          onCancel={handleOk}
        >
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="childFirstName"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="childLastName"
              label="Surname"
              rules={[
                { required: true, message: "Please input your surname!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="childAddress"
              label="Address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Date Of Birth"
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ChildList;