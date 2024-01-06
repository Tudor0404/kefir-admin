import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type payload = {
  name: string;
  ingredients: Record<string, string>;
  notes?: string;
};

export async function PATCH(req: Request, context: any) {
  try {
    const { id } = context.params;

    const reqJSON: payload = await req.json();

    const newRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        ingredients: reqJSON.ingredients,
        name: reqJSON.name,
        notes: reqJSON.notes,
      },
    });

    return new NextResponse(`Recipe '${newRecipe.name}' has been updated`, {
      status: 200,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new NextResponse(e.message, { status: 500 });
    }

    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
