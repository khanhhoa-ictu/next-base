import React from 'react'
import LoginForm from './components/LoginFrom'
import { Card, Row } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'
import logoLogin from "../../assets/login/login-1.svg";
import RightDriver from './components/RightDriver'
import logo from "@/assets/logo/logo.png";

function Login() {
  return (
    <div className={styles.loginContainer}>
    
    <div className={styles.wrapperLogin}>
      <div className={styles.formContainer}>
        <Card bordered className={styles.loginForm}>
          <Row justify="center" className={styles.formTitle}>
            <Image src={logo} alt="" width={598} height={182} />
            <h3 className='text-center'>we are laugh</h3>
          </Row>
          <LoginForm />
        </Card>

        <Card className={styles.signUp} bordered>
          <Row justify="center" className={styles.formTitle}>
            <h3>
              Nếu chưa có tài khoản vui lòng{" "}
              <Link href="/register">đăng ký</Link>
            </h3>
          </Row>
        </Card>
      </div>

      <RightDriver />
    </div>
    <div className={styles.wrapperImage}>
      <Image src={logoLogin} alt="" />
    </div>
  </div>

  )
}

export default Login