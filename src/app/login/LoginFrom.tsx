'use client'
import { handleErrorMessage } from '@/lib/utils'
import { authApiRequest, login } from '@/service/auth'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
    const onFinish = async(payload: any) => {
      try {
        const data:any = await login(payload);
        await authApiRequest.authNextServer(data.payload)
        router.push('/')
      } catch (error:any) {
        handleErrorMessage({error})
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