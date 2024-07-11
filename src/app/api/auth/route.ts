import { decodeJWT } from "@/lib/utils";
import { IPayloadJWT } from "@/types";


export async function POST(request: Request) {
  const res = await request.json();
  console.log('',res)
  if (!res.token) {
    return Response.json(
      { message: "khong nhan duoc token" },
      {
        status: 400,
      }
    );
  }
  const payload: IPayloadJWT = decodeJWT(res.token)
  const expireDate = new Date(payload.exp * 1000).toUTCString()
  return (Response as any).json(res, {
    status: 200,
    statusText: "OK",
    headers:  {
      "Set-Cookie": [
        `token=${res.token}; Path=/; HttpOnly; `,
        `refreshToken=${res.refreshToken}; Path=/; HttpOnly`,
      ],
    },
  });
}
