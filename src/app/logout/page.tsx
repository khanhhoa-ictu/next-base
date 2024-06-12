'use client'
import { clientToken } from '@/lib/http';
import { authApiRequest } from '@/service/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Logout() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    useEffect(()=>{
        const handleLogout = async() =>{
            try {
                await authApiRequest.logoutNextClientToNextServer(true);
                router.push('/login')
            } catch (error) {
                console.log(error)
            }
             
        }
        if(token === clientToken.value){
            handleLogout()
        }
    },[token, router])
  return (
    <div>Logout</div>
  )
}

export default Logout