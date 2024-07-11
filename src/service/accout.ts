import http from "@/lib/http";

export const getAccount = () => {
  return http.get(`about`);
};

export const getAccountSever = (token: any) => {
  return http.get(`about`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const refreshTokenToServer = (refreshToken: string, token: string) =>{
  return  http.post("refreshToken", {refreshToken});
}
 

export const refreshTokenToNextServer = () =>
  http.post("api/auth/refresh-token", {}, { baseUrl: "" });
