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
  
  export const convertImages = (htmlText: string) =>
    htmlText.replace(
      /<div style="text-align:none;"><img/g,
      '<div style="text-align:center;"><img'
    );
  
  export const checkScript = (htmlText: string) => {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const testScript = SCRIPT_REGEX.test(htmlText);
  
    return testScript;
  };
  
  export const replaceURLs = (message: string) => {
    if (!message) return;
  
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match("^https?://")) {
        hyperlink = "http://" + hyperlink;
      }
      return (
        '<a href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        url +
        "</a>"
      );
    });
  };