import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete("authToken");
    return NextResponse.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
    });
  }
};
