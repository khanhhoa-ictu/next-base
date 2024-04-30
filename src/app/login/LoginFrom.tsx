'use client'
import React from 'react'
import { Button, Form, Input } from 'antd'
import { handleErrorMessage } from '@/lib/utils'
import { useAppContext } from '@/AppProvider'

function LoginForm() {
  const {setSesstionToken} = useAppContext()
    const onFinish = async() => {
      try {
        const data = await fetch('/api/auth',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({payload: 'username'})
        }).then(async (response) =>{
          const payload = await response.json();
          const data = {
            status: response.status,
            payload
          }
          if (response.ok){
            throw data
          }
          return data
        })
        setSesstionToken(data.payload?.data?.token)
        console.log(data)
      } catch (error) {
        handleErrorMessage(error)
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