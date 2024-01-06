import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type payload = {
  name: string;
  mqtt_id: string;
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const reqJSON: payload = await req.json();

    const newRecipe = await prisma.station.create({
      data: reqJSON,
    });

    return new NextResponse(`Station '${newRecipe.name}' has been created`, {
      status: 200,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
      return new NextResponse(e.message, { status: 500 });
    }
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
