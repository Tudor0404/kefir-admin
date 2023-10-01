import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type payload = {
	name: string;
	mqtt_id: string;
};

export async function PATCH(req: Request, context: any) {
	try {
		const { id } = context.params;

		const reqJSON: payload = await req.json();

		const res = await prisma.station.update({
			where: { id: parseInt(id) },
			data: {
				name: reqJSON.name,
				mqtt_id: reqJSON.mqtt_id,
			},
		});

		return new NextResponse(`Recipe '${res.name}' has been updated`, {
			status: 200,
		});
	} catch (e: unknown) {
		if (e instanceof Error) {
			return new NextResponse(e.message, { status: 500 });
		}

		return new NextResponse(JSON.stringify(e), { status: 500 });
	}
}
