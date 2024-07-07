'use client'
import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import CommonInput from "@/components/common-input/page";
import { ISignUp } from "@/types/auth";
import { handleErrorMessage } from "@/lib/utils";

function FormSignUp() {
    const handleSubmit = async (payload: ISignUp) => {
        const params = {
            username: payload.username,
            password: payload.password,
            confirm: payload.confirm,

        } 
        const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const testScript =
          SCRIPT_REGEX.test(params.username) ||
          SCRIPT_REGEX.test(params.password) ||
          SCRIPT_REGEX.test(params.confirm);
        if (testScript) {
          message.destroy();
          message.error("Đăng ký thất bại");
          return;
        }
        try {
        //   await signUp(params);
        //   message.destroy();
        //   message.success("Đăng ký thành công");
        //   router.push("/login");
        } catch (error) {
          handleErrorMessage({error});
        }
      };


  return (
    <Form onFinish={handleSubmit}>
      <CommonInput
        name="username"
        ruleMessage="Username không được để trống"
        placeholder="Tên tài khoản"
        maxLength={50}
      />

      <CommonInput
        name="password"
        ruleMessage="password không được để trống"
        placeholder={"Mật khẩu"}
        maxLength={50}
        type="password"
      />

      <Form.Item
        name="confirm"
        rules={[
          { required: true, message: "password không được để trống" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("mật khẩu không trùng khớp"));
            },
          }),
        ]}
        dependencies={["password"]}
        labelAlign="left"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.Password
          className={styles.customInputSignUp}
          placeholder={"Xác nhận mật khẩu"}
        />
      </Form.Item>

      <Form.Item labelCol={{ span: 24 }}>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.btnSignUp}
        >
          Đăng ký
        </Button>
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }}>
        <p>
          <Link href="/login">Đăng nhập</Link>
        </p>
      </Form.Item>
    </Form>
  );
}

export default FormSignUp;