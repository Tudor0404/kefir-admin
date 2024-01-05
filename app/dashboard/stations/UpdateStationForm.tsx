"use client";
import { useState, useEffect } from "react";
import { useAlerts } from "../../components/alert/AlertContext";
import Card from "../../components/cards/Card";

type Station = {
    id: number;
    name: string;
    mqtt_id: string;
    notes?: string;
};

type Props = {
    station: Station | null;
    onUpdate: (id: number, name: string, mqtt_id: string, notes?: string) => Promise<boolean>;
};

export default function UpdateStationForm(props: Props) {
    const { addAlert } = useAlerts();

    const [name, setName] = useState<string>("");
    const [mqtt_id, setMqttId] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    useEffect(() => {
        if (props.station) {
            setName(props.station.name);
            setMqttId(props.station.mqtt_id);
            setNotes(props.station.notes || "");
        }
    }, [props.station]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !mqtt_id) {
            addAlert("Station name and MQTT ID are required", "warning");
            return;
        }

        const success = await props.onUpdate(props.station!.id, name, mqtt_id, notes);

    };

    return (
            <form className="form-control w-full gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="label">
                        <span className="label-text">Station Name</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Station Name"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">MQTT ID</span>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="MQTT ID"
                        className="input input-bordered w-full"
                        value={mqtt_id}
                        onChange={(e) => setMqttId(e.target.value)}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Notes</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-start items-center flex-row gap-2">
                    <button className="btn btn-sm btn-success" type="submit">
                        Update Station
                    </button>
                </div>
            </form>
    );
}
