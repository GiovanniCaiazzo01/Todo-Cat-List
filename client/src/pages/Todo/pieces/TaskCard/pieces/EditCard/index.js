import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Input, Tag, Checkbox } from "antd";
import axios from "axios";

const EditCard = ({ onUpdate, task }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: "",
    description: "",
    isDone: false,
  });

  const editCard = async () => {
    setLoading(() => true);
    const base_url = "http://127.0.0.1:5000";
    const data = await axios.put(
      `${base_url}/todo/update-task/${task.task_id}`,
      { fields }
    );
    const res = data.data;
    onUpdate(res.message, res.result);
    setOpen(() => false);
    setLoading(() => false);
  };

  const openModal = (e) => {
    setOpen(() => true);
    e.target.name !== "isDone"
      ? setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      : setFields((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const closeModal = () => {
    setOpen(() => false);
  };

  return (
    <>
      <EditOutlined onClick={openModal} />
      <Modal
        title={"Edit your Tasks"}
        open={open}
        onCancel={closeModal}
        onOk={editCard}
        confirmLoading={loading}
      >
        <Input
          name="title"
          defaultValue={task.title}
          prefix={<Tag color="gray">Title :</Tag>}
          onChange={openModal}
        />
        <Input
          name="description"
          defaultValue={task.description}
          prefix={<Tag color="gray">Description :</Tag>}
          onChange={openModal}
        />
        <>
          <Tag color="gray">Done&nbsp;&nbsp;:</Tag>
          <Checkbox
            name="isDone"
            defaultChecked={task.isDone}
            onChange={openModal}
          ></Checkbox>
        </>
      </Modal>
    </>
  );
};

export { EditCard };
