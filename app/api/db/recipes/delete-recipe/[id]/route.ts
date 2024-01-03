import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, context: any) {
	try {
		const { id } = context.params;

		const res = await prisma.recipe.update({
			where: { id: parseInt(id) },
			data: {
				deleted: true,
			},
		});

		return new NextResponse(`Successfully deleted recipe '${res.name}'`, {
			status: 200,
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return new NextResponse(e.message, { status: 500 });
		}

		return new NextResponse(JSON.stringify(e), { status: 500 });
	}
}
