import React, { useState, useEffect } from "react";
import { Avatar, Card, Skeleton, Row, Tag, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { EditCard, DeleteCard } from "./pieces";

const TaskCard = ({ onMessage, saveResult }) => {
  const [tasks, setTask] = useState();
  const [loading, setLoading] = useState(false);

  const base_url = "http://127.0.0.1:5000";
  const onDelete = (message, result) => {
    onMessage(message, result);
  };

  const onUpdate = (message, result) => {
    onMessage(message, result);
  };
  const fetchTask = async () => {
    setLoading(true);
    const data = await axios.get(base_url + "/todo/get_all");
    const task = data.data.tasks;
    setTask(task);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
  }, [saveResult]);

  return (
    <>
      {tasks ? (
        <Row>
          {tasks.map((task) => {
            return (
              <Card
                loading={loading}
                style={{
                  width: 600,
                  marginTop: 16,
                  marginLeft: 16,
                }}
                actions={[
                  <Tag color="blue">{task.timeStamp}</Tag>,
                  <EditCard onUpdate={onUpdate} task={task} />,
                  task.isDone ? (
                    <Tag color="green">Done</Tag>
                  ) : (
                    <Tag color="red">Not Done</Tag>
                  ),
                  <DeleteCard onDelete={onDelete} task_id={task.task_id} />,
                ]}
                key={task.task_id}
              >
                <Skeleton loading={loading} avatar active>
                  <Card.Meta
                    avatar={
                      <Avatar
                        src={task.avatar}
                        style={{ height: "200px", width: "200px" }}
                      />
                    }
                    title={task.title}
                    description={task.description}
                  />
                </Skeleton>
              </Card>
            );
          })}
        </Row>
      ) : null}
    </>
  );
};

export { TaskCard };
