import { ICustomOption } from "@/types";
import { cookies, headers } from "next/headers";
import configProject from "@/config";
import { refreshTokenToNodeServer } from "@/service/accout";
import { redirect } from "next/navigation";

export const httpServer = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  option?: ICustomOption,
): Promise<{
  status: number;
  ok: boolean;
  payload: any;
}> => {
  const cookieHeader = headers().get("cookie") ?? "";
  const body = option?.body ? JSON.stringify(option.body) : undefined;
  const res = await fetch(`${configProject.NEXT_PUBLIC_ENDPOINT}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...option?.headers,
      cookie: cookieHeader,
    },
    body,
    credentials: "include",
  });
  // parse payload an toàn
  const payload = await res.json().catch(() => null);

  // 🔥 TOKEN HẾT HẠN → REFRESH
  if (res.status === 401) {
    // redirect(`/auth/refresh?next=/${url}`);
  }

  return {
    status: res.status,
    ok: res.ok,
    payload,
  };
};

export const httpServerApi = {
  get(url: string, option?: Omit<ICustomOption, "body"> | undefined) {
    return httpServer("GET", url, option);
  },

  post(
    url: string,
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return httpServer("POST", url, { ...option, body });
  },
  put(
    url: string,
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return httpServer("PUT", url, { ...option, body });
  },
  delete(
    url: string,
    body: any,
    option?: Omit<ICustomOption, "body"> | undefined
  ) {
    return httpServer("DELETE", url, { ...option, body });
  },
};
