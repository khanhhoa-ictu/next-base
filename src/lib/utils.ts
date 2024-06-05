import config from "@/config";
import { message } from "antd";

export const handleErrorMessage = (error: any) => {
    message.destroy();
    message.error(getErrorMessage(error));
    // if (config.NEXT_PUBLIC_ENDPOINT !== "prod") {
    //   console.log(error);
    // }
  };
  
  export const getErrorMessage = (error: any) => {
    return error?.payload?.message || "Something went wrong!";
  };