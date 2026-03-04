"use client";
import { handleErrorMessage } from "@/lib/utils";
import { authApiRequest, register } from "@/service/auth";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const onFinish = async (payload: any) => {
    try {
      const res: any = await authApiRequest.authNextServer(payload);
      localStorage.setItem("expiresAt", res?.payload?.expiresAt);
      message.success("Login thành công");
      router.push("/");
      router.refresh();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Form name="basic" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
