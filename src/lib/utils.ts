import { message } from "antd";
import config from "@/config";

export const handleErrorMessage = (error: any) => {
    message.destroy();
    message.error(getErrorMessage(error));
    if (config.NEXT_PUBLIC_ENDPOINT !== "prod") {
      console.log(error);
    }
  };
  
  export const getErrorMessage = (error: any) => {
    return error?.response?.data?.msg || "Something went wrong!";
  };