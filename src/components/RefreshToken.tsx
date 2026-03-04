"use client";
import { authApiRequest } from "@/service/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function RefreshToken() {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiresAt = Number(
        document.cookie
          .split("; ")
          .find((c) => c.startsWith("expiresAt="))
          ?.split("=")[1]
      );
      if (expiresAt) {
        const compare =
          (Number(expiresAt) - Math.floor(now.getTime() / 1000)) / 60;
        console.log(compare, "minutes to expire");
        if (compare <= 1) {
          handleRefresh();
        }
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    try {
      await authApiRequest.refreshAccessTokenToNextServer();
    } catch (error) {
      await authApiRequest.logoutNextClientToNextServer();
      router.push("/login");
    }
  };
  return <></>;
}

export default RefreshToken;
