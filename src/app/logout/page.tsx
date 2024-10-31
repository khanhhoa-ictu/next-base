'use client'
import { handleErrorMessage } from '@/lib/utils';
import { authApiRequest } from '@/service/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'

function Logout() {
    console.log('what')

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    useEffect(()=>{
        console.log('?zz')
        const handleLogout = async() =>{
            try {
                await authApiRequest.logoutNextClientToNextServer(true);
                router.push('/login')
            } catch (error) {
                handleErrorMessage(error)
            }
             
        }
        if(token === localStorage.getItem('token')){
            console.log('zooo k')
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