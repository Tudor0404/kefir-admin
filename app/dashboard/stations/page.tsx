"use client";

import GridLayout from "../../components/layouts/GridLayout";
import Card from "../../components/cards/Card";
import CardTable from "../../components/cards/CardTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import { useAlerts } from "../../components/alert/AlertContext";
import { useModal } from "../../components/modal/ModalContext";
import CreateStationForm from "./CreateStationForm";
import StationDisplay from "./StationDisplay";
import UpdateStationForm from "./UpdateStationForm";

export default function Page() {
	const { addAlert } = useAlerts();
	const { showModal, hideModal } = useModal();
	const [loading, setLoading] = useState(false);
	const [stations, setStations] = useState<
		{
			id: number;
			name: string;
			mqtt_id: string;
			last_active?: Date;
			last_message?: string;
			notes?: string
			latest_version: number;
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			await refreshTable();
		})();
	}, []);


	async function refreshTable() {
		setLoading(true);
		try {
			const { data } = await axios.get("/api/db/stations/get-stations")

			if (stations !== data) {
				setStations(data);
			}
		} catch (e) {
			//@ts-ignore
			addAlert( e.response?.data ?? e.message ?? "Error refreshing stations", "error");
			return false;
		} finally {
			setLoading(false);
		}
	}


	async function onCreate(name:string, mqttID:string, notes?: string) {
		try {
			const res = await axios.post("/api/db/stations/create-station", {
			  name: name,
			  mqtt_id: mqttID,
			  notes: notes,
			});
	  
			addAlert(res.data, "success");
			await refreshTable();
			return true;
		  } catch (e) {
			//@ts-ignore
			addAlert( e.response?.data ?? e.message ?? "Error creating station", "error");
			return false;
		  }
	}


	async function onUpdate(id: number, name: string, mqtt_id: string, notes?: string) {
		try {
			const res = await axios.patch(
				"/api/db/stations/update-station/" + id,
				{
					name: name,
					mqtt_id: mqtt_id,
					notes: notes == "" ? null : notes,
				}
			);

			addAlert(res.data, "success");
			await refreshTable();
			hideModal();
			return true;
		} catch (e) {
			//@ts-ignore
			addAlert( e.response?.data ?? e.message ?? "Error updating station", "error");
			return false;
		}
	}

	async function deleteStation(id: number) {
		try {
			const res = await axios.delete(
				"/api/db/stations/delete-station/" + id
			);
			addAlert(res.data, "success");
			await refreshTable();

			return true;
		} catch (e) {
			//@ts-ignore
			addAlert( e.response?.data ?? e.message ?? "Error updating station", "error");
			return false;
		}
	}


	return (
		<GridLayout>
			<CardTable
				title="Stations"
				headers={["ID", "Name", "Last Message", "Last Ping","Actions"]}
				sortable={[true, true, true, true, false]}
				style={"[&>thead>tr>th:last-child]:w-0"}
				data={stations.map((e, i) => {
					return [
						e.id,
						e.name,
						e.last_message,
						e.last_active?.getDate(),
						<div
							key={i}
							className="flex flex-row gap-1"
						>
							<button
								className="btn btn-xs btn-success"
								onClick={() => {
									showModal(
									  <StationDisplay
										name={e.name}
										mqtt_id={e.mqtt_id}
										notes={e.notes}
										latest_version={e.latest_version}
										last_active={e.last_active}
										last_message={e.last_message}
										id={e.id}
									  />,
									  "View Recipe",
									  "Close"
									);
								  }}
							>
								View
							</button>
							<button
								className="btn btn-xs btn-warning"
								onClick={() => {
									showModal(
										<UpdateStationForm
										station={e}
										onUpdate={onUpdate}

										/>,
										"Update Station",
										"Close"
									  );
					
								}}
							>
								Edit
							</button>
							<button
								className="btn btn-xs btn-error"
								onClick={async () => {
									showModal(
										<div>
										  <h4 className="pb-2">
											Are you sure you want to delete the station &apos;{e.name}&apos;?
										  </h4>
										</div>,
										"Delete a Recipe",
										"Close",
										undefined,
										() => {
										  deleteStation(e.id);
										},
										undefined,
										"Delete"
									  );
								}}
							>
								Delete
							</button>
						</div>
					];
				})}
				compact
				loading={loading}
				refresh={refreshTable}
				span
			/>
			<CreateStationForm onSubmit={onCreate}/>
		</GridLayout>
	);
}
