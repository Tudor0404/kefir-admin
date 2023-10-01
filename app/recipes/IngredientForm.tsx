"use client";
import { useEffect, useState } from "react";
import DictionaryEditor from "../components/data-displays/DictionaryEditor";
import { useAlerts } from "../components/alert/AlertContext";

interface Item {
	key: string;
	value: string;
}

type Props = {
	prefix: string;
	onSubmit: (
		name: string,
		ingredients: Item[],
		notes?: string,
		id?: number
	) => Promise<Boolean>;
	initialName?: string;
	initialIngredients?: Item[];
	initialNotes?: string;
	id?: number;
	onReset?: () => any;
};

export default function IngredientForm(props: Props) {
	const { addAlert } = useAlerts();

	const [name, setName] = useState<string>("");
	const [ingredients, setIngredients] = useState<Item[]>([
		{ key: "", value: "" },
	]);
	const [notes, setNotes] = useState<string>("");
	const [id, setID] = useState<number>();

	useEffect(() => {
		setName(props.initialName || "");
		setIngredients(props.initialIngredients || [{ key: "", value: "" }]);
		setNotes(props.initialNotes || "");
		setID(props.id || undefined);
	}, [
		props.id,
		props.initialIngredients,
		props.initialName,
		props.initialNotes,
	]);

	return (
		<form
			className="form-control w-fit gap-4 min-w-full"
			onSubmit={async (e) => {
				e.preventDefault();

				if (name == "") {
					addAlert("Recipe must have a name", "warning");
					return;
				} else if (
					ingredients.some((e) => e.key == "" || e.value == "")
				) {
					addAlert(
						"Recipe ingredient list must be complete",
						"warning"
					);
					return;
				} else if (ingredients.length == 0) {
					addAlert(
						"Recipe ingredient list must have at least one ingredient",
						"warning"
					);
					return;
				}

				const res = await props.onSubmit(
					name,
					ingredients,
					notes,
					props.id || -1
				);

				if (res) {
					setName("");
					setNotes("");
					setIngredients([{ key: "", value: "" }]);
					setID(undefined);
				}
			}}
			onReset={() => {
				if (props.onReset) props.onReset();
				setName("");
				setIngredients([{ key: "", value: "" }]);
				setNotes("");
				setID(undefined);
			}}
		>
			<div>
				<label className="label">
					<span className="label-text">Recipe Name</span>
				</label>
				<input
					type="text"
					placeholder="Mint lemonade"
					className="input input-bordered w-full"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</div>

			<div>
				<label className="label">
					<span className="label-text">Ingredients</span>
				</label>
				<DictionaryEditor
					keyName="Ingredients"
					valueName="Amount"
					placeholderKeyName="ingredient"
					placeholderValueName="amount"
					state={ingredients}
					setter={setIngredients}
				/>
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
					className="btn btn-md btn-success "
					type="submit"
				>
					{props.prefix} Recipe
				</button>
				<button
					className="btn btn-md btn-warning "
					type="reset"
				>
					Reset
				</button>
			</div>
		</form>
	);
}