import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  try {
    const cookiesStore = cookies();
    cookiesStore.delete("authToken");
    return NextResponse.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
    });
  }
}
