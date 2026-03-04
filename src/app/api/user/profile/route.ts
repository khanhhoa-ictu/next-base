import { getAccountNodeServer } from "@/service/accout";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getAccountNodeServer();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
