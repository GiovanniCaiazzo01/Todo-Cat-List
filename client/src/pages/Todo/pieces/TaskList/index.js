import React, { useState } from "react";
import { Divider, message } from "antd";
import { AddTask } from "../AddTask";
import { TaskCard } from "../TaskCard";
const TaskList = () => {
  const [result, setResult] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const onMessage = (message, result) => {
    setResult(() => result);
    messageApi.open({
      type: result ? "success" : "error",
      content: message,
      duration: 5,
    });
  };
  React.useEffect(() => {
    setResult(() => false);
  }, [result]);

  return (
    <>
      {contextHolder}
      <Divider />
      <AddTask onMessage={onMessage} />
      <Divider />
      <TaskCard onMessage={onMessage} saveResult={result} />
    </>
  );
};

export { TaskList };
