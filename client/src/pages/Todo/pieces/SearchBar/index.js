import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Input, Button, Row } from "antd";
const SearchBar = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Input
            size="large"
            placeholder="Search for a task..."
            prefix={<UserOutlined />}
          ></Input>
        </Col>
        <Col span={12}>
          <Button type="primary">Search</Button>
        </Col>
      </Row>
    </>
  );
};

export { SearchBar };
