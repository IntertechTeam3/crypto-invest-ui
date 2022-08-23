import "antd/dist/antd.css";
import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";

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

const SendPopup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    form.required();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Send
      </Button>

      <Modal
        title="Send"
        visible={isModalVisible}
        cancelText="Cancel"
        okText="Send"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="From" label="From" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="To" label="To" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="Date Of Transaction"
            label="Date Of Transaction"
            rules={[
              {
                required: true,
                message: "Please input your date of transaction!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Amount"
            label="Amount"
            rules={[{ required: true, message: "Please input your amount!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default SendPopup;
