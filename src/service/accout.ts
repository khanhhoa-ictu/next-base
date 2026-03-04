import http from "@/lib/httpClient";
import { httpServerApi } from "@/lib/httpServer";

export const refreshTokenToServer = (refreshToken: string, token: string) => {
  return http.post("refreshToken", { refreshToken });
};

export const getAccountNodeServer = () => httpServerApi.get("auth/user/profile",{cache: 'no-store'});

export const login = (infoUser: any) => {
  return httpServerApi.post("login", infoUser);
};

export const refreshTokenToNodeServer = (refreshToken: string) => {
  return httpServerApi.post("auth/refresh-token", { refreshToken });
};

export const logoutNextServerToNodeServer = () => {
  return httpServerApi.post("auth/logout", {});
}