import { ICustomOption, IEntityError } from "@/types";
import { normalizePath } from "./utils";
import { redirect } from "next/navigation";
import configProject from "@/config";

const ENTITY_ERROR_STATUS = 422;
const AUTH_STATUS = 401;
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

export const isClient = typeof window !== "undefined";

// const request = async (
//   method: "GET" | "POST" | "PUT" | "DELETE",
//   url: string,
//   option?: ICustomOption
// ) => {
//   const baseUrl =
//     option?.baseUrl ?? configProject.NEXT_PUBLIC_ENDPOINT;

//   const res = await fetch(`${baseUrl}/${url}`, {
//     method,
//     body: option?.body ? JSON.stringify(option.body) : undefined,
//     headers: {
//       "Content-Type": "application/json",
//       ...option?.headers,
//     },
//     ...option,
//   });

//   let payload: any = null;
//   if (res.headers.get("content-type")?.includes("application/json")) {
//     payload = await res.json(); // ✅
//   }

//   return {
//     status: res.status,
//     ok: res.ok,
//     payload,
//   };
// };

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

  const res = await fetch(`/${url}`, {
    ...option,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
    credentials: "include",
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
    } else {
      throw new HttpError(data);
    }
  }
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
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return request("DELETE", url, { ...option, body });
  },
};

export default http;
