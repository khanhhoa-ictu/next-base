'use client'
import { authApiRequest } from '@/service/auth'
import { Button } from 'antd'
import React from 'react'

function ButtonLogout() {
    const handleLogout = async() =>{
        try {
            await authApiRequest.logoutNextClientToNextServer()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default ButtonLogout