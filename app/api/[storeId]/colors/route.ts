import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId is required.", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await db.color.create({
      data: { name, value, storeId: params.storeId },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required.", { status: 400 });
    }

    const color = await db.color.findMany({
      where: { storeId: params.storeId },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
