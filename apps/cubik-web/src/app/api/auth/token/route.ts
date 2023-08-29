import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({
        data: null,
        error: "No token found",
      });
    }

    return NextResponse.json({
      data: token,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      data: null,
      error: "Something went wrong",
    });
  }
}
