import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, context: any) {
  try {
    const { id } = context.params;

    const data = await prisma.recipe_version.findMany({
      where: { recipe_id: parseInt(id) },
    });

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new NextResponse(e.message, { status: 500 });
    }

    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
