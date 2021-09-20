import { Modal, Form, Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

function AddRoomModal(props) {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    users: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log({ formData: form.getFieldsValue() });
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    setIsAddRoomVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsAddRoomVisible(false);
    form.resetFields();
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
          labelAlign="left"
          form={form}
        >
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập tên phòng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoomModal;
