import { decodeJWT } from "@/lib/utils";
import { refreshTokenToServer } from "@/service/accout";
import { IPayloadJWT } from "@/types";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const token = cookieStore.get("token");

  if (!refreshToken?.value || !token?.value) {
    return Response.json(
      { message: "khong nhan duoc refreshToken" },
      {
        status: 400,
      }
    );
  }
  try {
    const res: any = await refreshTokenToServer(
      refreshToken.value,
      token.value
    );
    const payload: IPayloadJWT = decodeJWT(res.payload.token);
    const expireDate = new Date(payload.exp * 1000).toUTCString();
    return (Response as any).json(res.payload, {
      status: 200,
      statusText: "OK",
      headers:  {
        "Set-Cookie": [
          `token=${res.payload.token}; Path=/; HttpOnly; Expires=${expireDate}`,
          `refreshToken=${res.payload.refreshToken}; Path=/; HttpOnly`,
        ],
      },
    });
  } catch (error) {
    return Response.json({message: "phiên đăng nhập hết hạn"})
  }
}
