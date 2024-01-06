"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type RecipeVersion = {
  id: number;
  ingredients: { key: string; value: string }[];
  name: string;
  notes?: string;
  recipe_id: number;
  version: number;
};

type Recipe = {
  name: string;
  id: number;
  ingredients: {
    key: string;
    value: string;
  }[];
  notes?: string;
};

export default function RecipeDisplay(props: Recipe) {
  const [versions, setVersions] = useState<RecipeVersion[]>([]);

  const [selected, setSelected] = useState<Recipe>(props);

  useEffect(() => {
    (async () => {
      const data: RecipeVersion[] = (
        await axios.get("/api/db/recipes/get-recipe-versions/" + props.id)
      ).data;

      console.log(data);

      const sortedData = data.sort((e1, e2) =>
        e1.version > e2.version ? -1 : 1
      );

      setVersions(sortedData);
    })();
  }, []);

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
                id: s.id,
                ingredients: s.ingredients,
                name: s.name,
                notes: s.notes,
              });
            }}
          >
            {versions.map((e, i) => (
              <option key={i} className="hover:bg-base-300">
                {e.version} {i == 0 && " (Current)"}
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

        <div className="flex row-span-2 flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>Ingredients</h4>
          <table className="table border-collapse">
            <thead>
              <tr>
                <th className=" border border-base-300 p-1.5">Ingredient</th>
                <th className="border border-base-300 p-1.5">Amount</th>
              </tr>
            </thead>
            <tbody>
              {selected.ingredients.map((e, i) => (
                <tr key={i}>
                  <td className="border border-base-300 p-1.5">{e.key}</td>
                  <td className="border border-base-300 p-1.5">{e.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-1 bg-base-200 p-2 rounded">
          <h4>Notes</h4>
          <p>{selected.notes}</p>
        </div>
      </div>
    </div>
  );
}
