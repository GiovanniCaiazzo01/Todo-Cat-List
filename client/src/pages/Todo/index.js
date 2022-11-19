import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Input, Button } from "antd";
import axios from "axios";
const Todo = () => {
  const [tasks, setTasks] = useState([]);

  // TODO: get sui get-all
  const fetchTask = async () => {
    const base_url = "http://127.0.0.1:5000";
    const data = await axios.get(base_url + "/todo/get_all");
    const task = data.data.tasks;
    console.log(task);
  };

  useEffect(() => {
    fetchTask();
  }, [tasks]);

  return (
    <>
      <Row>
        <Col span={16}>
          <Input
            size="large"
            placeholder="Search for a task..."
            prefix={<UserOutlined />}
          ></Input>
        </Col>
        <Col>
          <Button type="primary">Search</Button>
        </Col>
      </Row>
      <pre>{(tasks, 2, null)}</pre>
    </>
  );
};

export default Todo;
