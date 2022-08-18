import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';

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

const WithdrawPopup = () => {

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
             Withdraw
            </Button>

        <Modal title="Withdraw" visible={isModalVisible} cancelText="Cancel" okText="Withdraw" onOk={handleOk} onCancel={handleCancel}>
            
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

            <Form.Item name="Balance" label="Balance" rules={[{required: true,},]}>
            <Input />
            </Form.Item>

            <Form.Item name="Amount" label="Amount" rules={[{required: true, message: 'Please input your amount!'},]}>
            <Input />
            </Form.Item>

            <Form.Item name="Name" label="Name" rules={[{required: true, message: 'Please input your name!',},]}>
            <Input />
            </Form.Item>

            <Form.Item name="Surname" label="Surname" rules={[{required: true, message: 'Please input your surname!'},]}>
            <Input />
            </Form.Item>

            <Form.Item name="Address" label="Address" rules={[{required: true,},]}>
            <Input />
            </Form.Item>
            </Form>

        </Modal>      
        </div>
    );
}
export default WithdrawPopup;