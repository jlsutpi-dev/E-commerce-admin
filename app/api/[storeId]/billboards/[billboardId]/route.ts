import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD _GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label && label.trim() === 0) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard   is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await db.billboard.update({
      where: { id: params.billboardId },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await db.billboard.delete({
      where: { id: params.billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD _DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
