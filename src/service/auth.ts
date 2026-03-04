import http from "@/lib/httpClient";

export const register = (infoUser: any) => {
  return http.post("register", infoUser);
};

export const authApiRequest = {
  authNextServer: (body: any) => {
    return http.post("api/auth", body);
  },
  refreshAccessTokenToNextServer: () => {
    return http.post("api/auth/refresh-token", {});
  },
  logoutNextClientToNextServer: () => {
    return http.post(
      "api/auth/logout",
      {}
    );
  },
};
