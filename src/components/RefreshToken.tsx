"use client";
import { decodeJWT, handleErrorMessage } from "@/lib/utils";
import { refreshTokenToNextServer } from "@/service/accout";
import { IPayloadJWT } from "@/types";
import { Button } from "antd";
import React, { useEffect } from "react";

function RefreshToken() {
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
      handleErrorMessage({ error });
    }
  };
  return (
    <div>
      <Button onClick={handleRefresh}>refresh</Button>
    </div>
  );
}

export default RefreshToken;
