import { React, useEffect, useState } from "react";
import "./childlist.css";
import {
  getParent,
  getChildsFromParent,
  addChild,
  getChild,
} from "../../../shared/contractDeploy";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import "antd/dist/antd.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import ChildsListItem from "../../../component/ChildListItem";
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
        {/*<tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Birth Date</th>
          <th>Public Adress</th>
          <th> Balance </th>
          <th> </th>
          <th> </th>
        </tr>*/}
        <div>
          <ChildsListItem childsArray={childsArray} />
        </div>
        {/*
        <tr>
          <td>İlkkan</td>
          <td>Kurt</td>
          <td>18/04/2006</td>
          <td>F61th6gd8J08s7H7d</td>
          <td>7 ETH </td>
          <td>
            <button type="button">Send </button>
          </td>
          <td>
            <button type="button">Withdraw </button>
          </td>
        </tr>
        <tr>
          <td>Ecemşah</td>
          <td>Kurt</td>
          <td>22/07/2010</td>
          <td>Qx1m3gd8J0K7Oph2</td>
          <td>11 ETH </td>
          <td>
            <button type="button">Send </button>
          </td>
          <td>
            <button type="button">Withdraw </button>
          </td>
        </tr>
        <tr>
          <td>Yılmaz</td>
          <td>Kurt</td>
          <td>15/04/2015</td>
          <td>Hkj381bHlaq76V51</td>
          <td>No Data </td>
          <td>
            <button type="button">Send </button>
          </td>
          <td>
            <button type="button">Withdraw </button>
          </td>
        </tr>*/}
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
