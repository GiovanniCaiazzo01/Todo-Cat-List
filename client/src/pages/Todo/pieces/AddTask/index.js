import React, { useState, useEffect } from "react";
import { Button, Popover, Input, Tag, Checkbox } from "antd";
import axios from "axios";
const AddTask = ({ onSave }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    isDone: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.target.name !== "isDone"
      ? setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      : setTask((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const saveTask = async () => {
    setLoading(() => true);
    const base_url = "http://127.0.0.1:5000";
    const data = await axios.post(base_url + "/todo/save", { task });
    setLoading(() => false);
    const res = data.data;
    onSave(res.message, res.result);
  };

  const content = (
    <>
      <Input
        name="title"
        prefix={<Tag color="gray">Title :</Tag>}
        onChange={handleChange}
      />
      <Input
        name="description"
        prefix={<Tag color="gray">Description :</Tag>}
        onChange={handleChange}
      />

      <Tag color="gray">
        Done&nbsp;&nbsp;
        <Checkbox name="isDone" onChange={handleChange}></Checkbox>
      </Tag>

      <Button loading={loading} onClick={() => saveTask()}>
        Salva
      </Button>
    </>
  );

  return (
    <Popover content={content} trigger={"click"}>
      <Button color="blue">Aggiungi Task</Button>
    </Popover>
  );
};

export { AddTask };
