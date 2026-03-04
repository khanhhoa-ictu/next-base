"use client";
import { handleErrorMessage } from "@/lib/utils";
import { authApiRequest } from "@/service/auth";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}

export default ButtonLogout;
