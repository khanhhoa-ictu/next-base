import { logoutNextServerToNodeServer } from "@/service/accout";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logoutNextServerToNodeServer();
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    cookies().delete("expiresAt");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
