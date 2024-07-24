import { ICustomOption, IEntityError } from "@/types";
import { normalizePath } from "./utils";
import { redirect } from "next/navigation";
import configProject from "@/config";

const ENTITY_ERROR_STATUS = 422;
const AUTH_STATUS = 401
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: number;
  payload: IEntityError;

  constructor({ status, payload }: { status: number; payload: IEntityError }) {
    super({ status, payload });
    if (status !== 422) {
      throw new Error("EntityError must have status 422");
    }
    this.status = status;
    this.payload = payload;
  }
}

export const isClient = typeof window !== 'undefined'

const request = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: ICustomOption | undefined
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  if(isClient){
    const token = localStorage.getItem('token');
    if(token){
      baseHeaders.Authorization = `Bearer ${token}`
    }
  }
 
  const baseUrl =
    option?.baseUrl !== undefined
      ? option?.baseUrl
      : configProject.NEXT_PUBLIC_ENDPOINT;
  const res = await fetch(`${baseUrl}/${url}`, {
    ...option,
    headers: {
      ...baseHeaders, 
      ...option?.headers,
    },
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res?.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as unknown as {
          status: number;
          payload: IEntityError;
        }
      );
    } else if(res.status === AUTH_STATUS){
      if(isClient){
        await fetch('/api/auth/logout',{
          method:'POST',
          body: JSON.stringify({force:true}),
          headers: baseHeaders
        })
        localStorage.removeItem('token')
        location.href = '/login'
      }else{
        const token = (option?.headers as any)?.Authorization.split('Bearer ')[1];
        redirect(`/logout/?token=${token}`)
      }
    } else {
      throw new HttpError(data);
    }
  }

  // if (isClient) {
  //   if (["/auth/login"].some((item)=>item === normalizePath(url))) {
  //    localStorage.setItem('token', (payload as any).token)
  //   }
  //   if (["auth/logout"].some((item)=>item === normalizePath(url))) {
  //     localStorage.removeItem('token')
  //   }
  // }

  return data;
};

const http = {
  get(url: string, option?: Omit<ICustomOption, "body"> | undefined) {
    return request("GET", url, option);
  },

  post(
    url: string,
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return request("POST", url, { ...option, body });
  },
  put(
    url: string,
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return request("PUT", url, { ...option, body });
  },
  delete(
    url: string,
    // body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return request("DELETE", url, { ...option });
  },
};

export default http;
