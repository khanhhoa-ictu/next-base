'use client'
import { handleErrorMessage } from '@/lib/utils';
import { authApiRequest } from '@/service/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

function Logout() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    useEffect(()=>{
        const handleLogout = async() =>{
            try {
                await authApiRequest.logoutNextClientToNextServer(true);
                router.push('/login')
            } catch (error) {
                handleErrorMessage(error)
            }
             
        }
        if(token === localStorage.getItem('token')){
            handleLogout()
        }
    },[token, router])
  return (
    <div>Logout</div>
  )
}

export default function LogoutPage(){
     return <Suspense>
        <Logout/>
    </Suspense>
}