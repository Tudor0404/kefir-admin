"use client";

import GridLayout from "../components/layouts/GridLayout";
import Card from "../components/cards/Card";
import CardTable from "../components/cards/CardTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import { useAlerts } from "../components/alert/AlertContext";
import { useModal } from "../components/modal/ModalContext";

export default function Page() {
	const [loading, setLoading] = useState(false);
	const [stations, setStations] = useState<
		{
			id: number;
			mqtt_id: string;
			last_active?: Date;
			last_message?: string;
		}[]
	>([]);

	async function refreshTable() {
		setLoading(true);
	}

	return (
		<GridLayout>
			<CardTable
				title="Stations"
				headers={["ID", "MQTT ID", "Last ping", "Actions"]}
				sortable={[true, true, true, false]}
				style={"[&>thead>tr>th:last-child]:w-0"}
				data={[]}
				compact
				loading={loading}
				refresh={refreshTable}
				span
			/>
		</GridLayout>
	);
}
