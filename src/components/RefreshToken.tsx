"use client";
import { decodeJWT, handleErrorMessage } from "@/lib/utils";
import { refreshTokenToNextServer } from "@/service/accout";
import { authApiRequest } from "@/service/auth";
import { IPayloadJWT } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RefreshToken() {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(()=>{
      const now = new Date();
      const newToken = localStorage.getItem('token');
      if(newToken){
        const payload: IPayloadJWT = decodeJWT(newToken );
        const expireDate = new Date(payload.exp * 1000);
        const compare = (expireDate.getTime() - now.getTime()) / 86400000;
        if(compare < 1){
          handleRefresh()
        }
      }
     
    }, 1000 * 60 * 60 )
   

    return () => clearInterval(interval)
  }, []);

  const handleRefresh = async () => {
    try {
      const data:any = await refreshTokenToNextServer();
      localStorage.setItem('token',data.payload.token)
    } catch (error) {
      await authApiRequest.logoutNextClientToNextServer(true);
      router.push('/login')
      handleErrorMessage({ error });
    }
  };
  return (
   null
  );
}

export default RefreshToken;
