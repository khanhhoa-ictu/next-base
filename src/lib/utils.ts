import config from "@/config";
import { IPayloadJWT } from "@/types";
import { message } from "antd";
import jwt from "jsonwebtoken";

export const handleErrorMessage = (error: any) => {
    message.destroy();
    message.error(getErrorMessage(error));
  };
  
  export const getErrorMessage = (error: any) => {
    return error?.payload?.message || "Something went wrong!";
  };

  export const normalizePath = (path:string) =>{
    return path.startsWith('/') ? path.slice(1) : path
  }

  export const decodeJWT = (token:string) =>{
    return jwt.decode(token) as IPayloadJWT;
  }