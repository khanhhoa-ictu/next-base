import { Button, Form } from "antd";
import React from "react";

interface CommonButtonSubmitProps {
  className: string;
  text: string;
  loading: boolean
}

function CommonButtonSubmit({ className, text, loading }: CommonButtonSubmitProps) {
  return (
    <Form.Item labelCol={{ span: 24 }}>
      <Button block type="primary" htmlType="submit" className={className} loading={loading}>
        {text}
      </Button>
    </Form.Item>
  );
}

export default CommonButtonSubmit;