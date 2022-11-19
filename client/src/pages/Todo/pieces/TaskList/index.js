import React, { useState, useEffect } from "react";
import { Divider, Row, Col } from "antd";
import axios from "axios";
const TaskList = () => {
  const [tasks, setTask] = useState();

  // TODO: get sui get-all
  const fetchTask = async () => {
    const base_url = "http://127.0.0.1:5000";
    const data = await axios.get(base_url + "/todo/get_all");
    const task = data.data.tasks;
    setTask(task);
  };

  useEffect(() => {
    fetchTask();
  }, [tasks]);

  return (
    <>
      <Divider />
      <Row>
        {tasks?.map((task) => {
          return (
            <>
              <Col span={2}>{task.title}</Col>
              <Col span={18}>{task.isDone}</Col>
              <Col span={2}>{task.description}</Col>
              <Col span={2}>{task.time_stamp}</Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export { TaskList };
