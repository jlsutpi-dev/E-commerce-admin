import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("size is required", { status: 400 });
    }

    const size = await db.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse("Size   is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await db.size.update({
      where: { id: params.sizeId },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("Size is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await db.size.delete({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE _DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
