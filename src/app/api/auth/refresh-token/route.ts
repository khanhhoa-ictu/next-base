import { refreshTokenToNodeServer } from "@/service/accout";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 422 }
      );
    }

    const res: any = await refreshTokenToNodeServer(refreshToken);
    if (!res?.ok) {
      return NextResponse.json(
        { message: "Failed to refresh token" },
        { status: 422 }
      );
    }

    // SET COOKIES
    cookies().set("accessToken", res.payload.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60, // 1h
    });

    // if backend rotate refresh token -> set again
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookies().set("expiresAt", String(res.payload.expiresAt), {
      httpOnly: false, 
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return NextResponse.json({
      accessToken: res.payload.accessToken,
      expiresAt: res?.payload.expiresAt,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
