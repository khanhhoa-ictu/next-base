'use client'
import CommonButtonSubmit from '@/components/common-button-submit/page'
import CommonInput from '@/components/common-input/page'
import { handleErrorMessage } from '@/lib/utils'
import { authApiRequest, login } from '@/service/auth'
import { ILogin } from '@/types/auth'
import { Form, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useState } from 'react'

function LoginForm() {
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (payload: ILogin) => {
    setLoading(true)
    const params = {
      username: payload.username,
      password: payload.password

    }
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const testScript =
      SCRIPT_REGEX.test(params.username) || SCRIPT_REGEX.test(params.password);
    if (testScript) {
      message.destroy();
      message.error("Đăng nhập thất bại");
      return;
    }
    try {
      const data = await login(params);
      await authApiRequest.authNextServer(data.payload)
      router.push("/");
    } catch (error) {
      handleErrorMessage({error});
    }finally{
      setLoading(false)
    }
  };

  return (
    <Form onFinish={handleSubmit} className={styles.formContainer}>
    <CommonInput
      name="username"
      ruleMessage="Username không được để trống"
      className={styles.customInputLogin}
      placeholder="Tên tài khoản"
      maxLength={50}
    />

    <CommonInput
      name="password"
      ruleMessage="Password không được để trống"
      className={styles.customInputLogin}
      placeholder="Mật khẩu"
      maxLength={50}
      type="password"
    />

    <CommonButtonSubmit className={styles.btnLogin} text="Đăng nhập" loading={loading} />

    <Form.Item labelCol={{ span: 24 }} className={styles.forgotPassword}>
      <Link href="/forgot-password">Quên mật khẩu</Link>
    </Form.Item>
  </Form>
  )
}

export default LoginForm