import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const data = await prisma.station.findMany({
			where: {
				deleted: false,
			},
		});

		return new NextResponse(JSON.stringify(data), { status: 200 });
	} catch (e: unknown) {
		if (e instanceof Error) {
			return new NextResponse(e.message, { status: 500 });
		}

		return new NextResponse(JSON.stringify(e), { status: 500 });
	}
}
