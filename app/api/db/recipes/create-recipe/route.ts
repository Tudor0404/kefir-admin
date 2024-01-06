import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type payload = {
  name: string;
  ingredients: Record<string, string>;
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const reqJSON: payload = await req.json();

    const newRecipe = await prisma.recipe.create({
      data: reqJSON,
    });

    return new NextResponse(`Recipe '${newRecipe.name}' has been created`, {
      status: 200,
    });
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof Error) {
      return new NextResponse(e.message, { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
