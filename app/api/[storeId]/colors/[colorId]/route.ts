import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("Color is required", { status: 400 });
    }

    const color = await db.color.findUnique({
      where: { id: params.colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name && name.trim() === 0) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value && value.trim() === 0) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await db.color.update({
      where: { id: params.colorId },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("Color is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await db.color.delete({
      where: { id: params.colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR _DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
