'use client'
import { handleErrorMessage } from '@/lib/utils'
import { authApiRequest } from '@/service/auth'
import { Button } from 'antd'
import React from 'react'

function ButtonLogout() {
    const handleLogout = async() =>{
        try {
            await authApiRequest.logoutNextClientToNextServer()
        } catch (error) {
          handleErrorMessage(error)
        }
    }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default ButtonLogout