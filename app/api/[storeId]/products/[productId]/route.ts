import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id: params.productId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      images,
      colorId,
      sizeId,
      categoryId,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name && name.trim() === 0) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("images is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await db.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });
    const product = await db.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((item: { url: string }) => item)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store is required", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    const storeBYUserId = await db.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeBYUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await db.product.delete({
      where: { id: params.productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT _DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
