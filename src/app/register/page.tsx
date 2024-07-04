import { Card, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import logo from "@/assets/logo/logo.png";
import FormSignUp from './components/FormSignUp';

function Register() {
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.wrapperSignUp}>
        <Card bordered className={styles.signUpForm}>
          <Row justify="center" className={styles.formTitle}>
            <Image src={logo} alt="" width={598} height={182} />
            <h3>we are laugh</h3>
          </Row>
          <FormSignUp />
        </Card>
      </div>
    </div>
  )
}

export default Register