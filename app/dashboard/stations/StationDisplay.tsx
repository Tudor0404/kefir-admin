import React, { useEffect, useState } from "react";
import axios from "axios";

type StationVersion = {
  id: number;
  mqtt_id: string;
  name: string;
  version: number;
  notes?: string;
  date_created: Date;
  station_id: number;
};

type Station = {
  id: number;
  name: string;
  mqtt_id: string;
  last_active?: Date;
  last_message?: string;
  latest_version: number;
  notes?: string;
};

export default function StationDisplay(props: Station) {
  const [versions, setVersions] = useState<StationVersion[]>([]);
  const [selected, setSelected] = useState<Station>(props);

  useEffect(() => {
    (async () => {
      const data: StationVersion[] = (
        await axios.get("/api/db/stations/get-station-versions/" + props.id)
      ).data;

      console.log(data);

      const sortedData = data.sort((a, b) => (a.version > b.version ? -1 : 1));

      setVersions(sortedData);
    })();
  }, [props.id]);

  return (
    <div className="w-full">
      {versions.length > 0 && (
        <div className="mb-2 flex flex-row justify-end items-center gap-2">
          <p className="inline-block label h-full align-baseline p-0">
            Version
          </p>
          <select
            className="select select-sm select-bordered !outline-none float-right"
            onChange={(e) => {
              const s =
                versions[
                  versions.length - parseInt(e.target.value.split(" ")[0])
                ];

              setSelected({
                ...selected,
                id: s.station_id,
                mqtt_id: s.mqtt_id,
                name: s.name,
                notes: s.notes,
                latest_version: s.version,
              });
            }}
          >
            {versions.map((version, i) => (
              <option key={i} className="hover:bg-base-300">
                {version.version} {i === 0 && " (Current)"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="w-full grid grid-cols-2 grid-rows-2 gap-2">
        <div className="flex flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>Name</h4>
          <p>{selected.name}</p>
        </div>

        <div className="flex flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>MQTT ID</h4>
          <p>{selected.mqtt_id}</p>
        </div>

        <div className="flex flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>Last Active</h4>
          <p>{selected.last_active?.toLocaleString()}</p>
        </div>

        <div className="flex flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>Notes</h4>
          <p>{selected.notes}</p>
        </div>
      </div>
    </div>
  );
}
