import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";

const DeleteCard = ({ task_id, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const base_url = "http://127.0.0.1:5000";

  const deleteCard = async () => {
    setLoading(true);
    const data = await axios.delete(`${base_url}/todo/delete-task/${task_id}`);
    const res = data.data;
    onDelete(res.message, res.result);
    setLoading(false);
  };

  return loading ? (
    <Spin tip="loading" />
  ) : (
    <DeleteOutlined onClick={() => deleteCard()} />
  );
};

export { DeleteCard };
