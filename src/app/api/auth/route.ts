import { login } from "@/service/accout";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const data: any = await login(payload);
  const res = data?.payload;
  console.log(res?.expiresAt);
  if (data.status !== 200) {
    return NextResponse.json(data.payload, { status: data.status });
  }

  if (!res.accessToken) {
    return NextResponse.json(
      { message: "Không nhận được token" },
      { status: 400 }
    );
  }

  cookies().set("accessToken", res.accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60,
  });

  cookies().set("refreshToken", res.refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set("expiresAt", String(res.expiresAt), {
    httpOnly: false, 
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return NextResponse.json({
    user: res?.user,
    expiresAt: res?.expiresAt,
  });
}
