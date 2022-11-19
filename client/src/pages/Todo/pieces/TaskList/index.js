import React, { useState, useEffect } from "react";
import { AddTask } from "../AddTask";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Divider, Avatar, Card, Skeleton, Row, Tag, message } from "antd";

const { Meta } = Card;

const TaskList = () => {
  const [tasks, setTask] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const base_url = "http://127.0.0.1:5000";

  const onSave = (message, result) => {
    setResult(() => result);
    messageApi.open({
      type: result ? "success" : "error",
      content: message,
      duration: 3,
    });
  };

  const fetchTask = async () => {
    setLoading(true);
    const data = await axios.get(base_url + "/todo/get_all");
    const task = data.data.tasks;
    console.log(task);
    setTask(task);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
    setResult(false);
  }, [result]);

  return (
    <>
      {contextHolder}
      <Divider />
      <AddTask onSave={onSave} />
      <Divider />
      {tasks ? (
        <Row>
          {tasks.map((task) => {
            return (
              <Card
                style={{
                  width: 600,
                  marginTop: 16,
                  marginLeft: 16,
                }}
                actions={[
                  <Tag color="blue">{task.timeStamp}</Tag>,
                  <EditOutlined key="edit" />,
                  task.isDone ? (
                    <Tag color="green">Done</Tag>
                  ) : (
                    <Tag color="red">Not Done</Tag>
                  ),
                  <DeleteOutlined />,
                ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
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

export { TaskList };
