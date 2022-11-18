import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Input, Button } from "antd";
const Todo = () => {
  const [tasks, setTasks] = useState([]);

  // TODO: get sui get-all
  const fetchTask = async () => {
    const base_url = "127.0.0.1:5000";
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
    </>
  );
};

export default Todo;
