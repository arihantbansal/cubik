import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@cubik/database";
export async function GET(request: NextRequest) {
  const id: string = await request.json();
  try {
    const hackathonDetails = prisma.project.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        shortDescription: true,
        logo: true,
        ogImage: true,
      },
    });

    return NextResponse.json({ data: hackathonDetails, error: null });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: null, error: error });
  }
}
