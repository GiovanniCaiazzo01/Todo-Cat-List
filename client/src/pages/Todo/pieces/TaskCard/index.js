import React, { useState, useEffect } from "react";
import { Avatar, Card, Skeleton, Row, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const TaskCard = ({ saveResult }) => {
  const [tasks, setTask] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const base_url = "http://127.0.0.1:5000";
  const onDelete = (message, result) => {
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
    setTask(task);
    setLoading(false);
  };

  const deleteTask = async (task_id) => {
    setLoading(true);
    const data = await axios.delete(`${base_url}/todo/delete-task/${task_id}`);
    const res = data.data;
    setResult(() => res.result);
    onDelete(res.message, res.result);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
    setResult(() => false);
  }, [saveResult, result]);

  return (
    <>
      {contextHolder}
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
                  <EditOutlined key="edit" />,
                  task.isDone ? (
                    <Tag color="green">Done</Tag>
                  ) : (
                    <Tag color="red">Not Done</Tag>
                  ),
                  <DeleteOutlined onClick={() => deleteTask(task.task_id)} />,
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
