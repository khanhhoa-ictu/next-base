'use client'
import React from 'react'
import { Button, Form, Input } from 'antd'
import { handleErrorMessage } from '@/lib/utils'
import { useAppContext } from '@/AppProvider'
import configProject from '@/config'
import { login } from '@/service/auth'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const {setSesstionToken} = useAppContext()
    const onFinish = async(payload: any) => {
      console.log(payload)
      try {
        const data = await login(payload);
        console.log(data)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Form
    name="basic"
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default LoginForm