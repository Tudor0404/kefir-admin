"use client";
import { useAlerts } from "../../components/alert/AlertContext";
import { useState } from "react";
import Card from "../../components/cards/Card";

type Props = {
    onSubmit: (name:string, mqttID:string, notes?: string) => Promise<Boolean>;

};

export default function CreateStationForm(props: Props) {	
    const { addAlert } = useAlerts();

    const [name, setName] = useState<string>("");
    const [mqttID, setMqttID] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    function makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }


    return <Card className="!h-fit" title="Create new station">
        <form className="form-control w-fit gap-4 min-w-full"
        onSubmit={async (e) => {
            e.preventDefault();

            if (!name) {
                addAlert("Station must have a name", "warning");
					return;
            } else if (!mqttID) {
                addAlert("Station must have an id", "warning");
				return;
            }

            const res = await props.onSubmit(name, mqttID, notes);

            if (res) {
                setName("");
                setMqttID("");
                setNotes("");
            }
        }}
        >
            <div>
				<label className="label">
					<span className="label-text">Station Name</span>
				</label>
				<input
					required
					type="text"
					placeholder="shed 1"
					className="input input-sm input-bordered w-full"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</div>
            <div>
				<label className="label">
					<span className="label-text">MQQT ID</span>
				</label>
                <div className="w-full flex justify-start items-center gap-2">

                
				<input
					required
					type="text"
					placeholder="shed-1"
					className="input input-sm input-bordered flex-grow"
					onChange={(e) => setMqttID(e.target.value)}
					value={mqttID}
				/>
                <button className="btn btn-xs" type="button" onClick={() => {
                    setMqttID(makeid(24));
                }}>
                    Random 
                </button>
                </div>
			</div>

            <div>
				<label className="label">
					<span className="label-text">Notes</span>
				</label>
				<textarea
					className="textarea textarea-bordered w-full"
					placeholder="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				></textarea>
			</div>

            <div className="flex justify-start items-center flex-row gap-2">
				<button
					className="btn btn-sm btn-success "
					type="submit"
				>
					Create Station
				</button>
				<button
					className="btn btn-sm btn-warning "
					type="reset"
				>
					Reset
				</button>
			</div>

        </form>
    </Card>;
}
