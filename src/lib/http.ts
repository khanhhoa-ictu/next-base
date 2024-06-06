import configProject from "@/config";
import { ICustomOption, IEntityError } from "@/types";
import { normalizePath } from "./utils";

const ENTITY_ERROR_STATUS = 422;

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

class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token) {
    if (typeof window === "undefined") {
      throw new Error("can not set token on sever side");
    }
    this.token = token;
  }
}

export const clientToken = new SessionToken();

const request = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: ICustomOption | undefined
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientToken.value ? `Bearer ${clientToken.value}` : "",
  };
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
    } else {
      throw new HttpError(data);
    }
  }
  if (typeof window !== "undefined") {
    if (["/auth/login"].some((item)=>item === normalizePath(url))) {
      clientToken.value = (payload as any).token;
    }
    if (["auth/logout"].some((item)=>item === normalizePath(url))) {
      clientToken.value = "";
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
