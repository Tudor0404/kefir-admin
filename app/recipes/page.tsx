"use client";

import GridLayout from "../components/layouts/GridLayout";
import Card from "../components/cards/Card";
import CardTable from "../components/cards/CardTable";
import { useEffect, useState } from "react";
import axios from "axios";
import IngredientForm from "./IngredientForm";
import { Prisma } from "@prisma/client";
import { useAlerts } from "../components/alert/AlertContext";
import { useModal } from "../components/modal/ModalContext";
import RecipeDisplay from "./RecipeDisplay";

export default function Page() {
	const { addAlert } = useAlerts();
	const { showModal } = useModal();
	const [recipes, setRecipes] = useState<
		{
			id: number;
			name: string;
			ingredients: Prisma.JsonValue;
			notes: string | null;
		}[]
	>([]);
	const [recipeUpdate, setRecipeUpdate] = useState<{
		id: number;
		name: string;
		ingredients: Prisma.JsonValue;
		notes: string | null;
	}>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			await refreshTable();
		})();
	}, []);

	async function refreshTable() {
		setLoading(true);
		try {
			const { data } = await axios.get("/api/db/recipes/get-recipes");

			if (recipes !== data) {
				setRecipes(data);
			}
		} catch {
			addAlert("Error refreshing recipes", "error");
		} finally {
			setLoading(false);
		}
	}

	async function onCreate(
		name: string,
		ingredients: {
			key: string;
			value: string;
		}[],
		notes?: string,
		id?: number
	) {
		try {
			const res = await axios.post("/api/db/recipes/create-recipe", {
				name: name,
				ingredients: ingredients,
				notes: notes == "" ? null : notes,
			});

			addAlert(res.data, "success");
			await refreshTable();
			return true;
		} catch (e) {
			if (e instanceof Error) {
				addAlert(e.message, "error");
			} else {
				addAlert("Error adding recipe", "error");
			}
			return false;
		}
	}

	async function onUpdate(
		name: string,
		ingredients: {
			key: string;
			value: string;
		}[],
		notes?: string,
		id?: number
	) {
		try {
			const res = await axios.patch(
				"/api/db/recipes/update-recipe/" + id,
				{
					name: name,
					ingredients: ingredients,
					notes: notes == "" ? null : notes,
				}
			);

			addAlert(res.data, "success");
			await refreshTable();
			return true;
		} catch (e) {
			if (e instanceof Error) {
				addAlert(e.message, "error");
			} else {
				addAlert("Error adding recipe", "error");
			}
			return false;
		}
	}

	function ingredientToString(data: Prisma.JsonValue) {
		if (Array.isArray(data)) {
			//@ts-ignore
			return data.map((e) => e.key).join(", ") || "";
		} else {
			return data?.toString() || "";
		}
	}

	async function deleteRecipe(id: number) {
		try {
			const res = await axios.delete(
				"/api/db/recipes/delete-recipe/" + id
			);
			addAlert(res.data, "success");
			await refreshTable();

			return true;
		} catch (e) {
			if (e instanceof Error) {
				addAlert(e.message, "error");
			} else {
				addAlert("Error adding recipe", "error");
			}
			return false;
		}
	}

	return (
		<GridLayout>
			<CardTable
				title="Recipes"
				headers={["ID", "Name", "Ingredients", "Actions"]}
				style={"[&>thead>tr>th:last-child]:w-0"}
				data={recipes.map((e, i) => {
					return [
						e.id,
						e.name,
						ingredientToString(e.ingredients),
						<div
							key={i}
							className="flex flex-row gap-1"
						>
							<button
								className="btn btn-xs rounded-none btn-success"
								onClick={() => {
									showModal(
										<RecipeDisplay
											name={e.name}
											ingredients={
												e.ingredients as {
													key: string;
													value: string;
												}[]
											}
											notes={e.notes || undefined}
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
								className="btn btn-xs rounded-none btn-warning"
								onClick={() => {
									setRecipeUpdate({
										id: e.id,
										name: e.name,
										ingredients: e.ingredients,
										notes: e.notes,
									});
								}}
							>
								Edit
							</button>
							<button
								className="btn btn-xs rounded-none btn-error"
								onClick={() => {
									showModal(
										<div>
											<h4 className="pb-2">
												Are you sure you want to delete
												this recipe?
											</h4>
											<RecipeDisplay
												name={e.name}
												id={e.id}
												ingredients={
													e.ingredients as {
														key: string;
														value: string;
													}[]
												}
												notes={e.notes || undefined}
											/>
										</div>,
										"Delete a Recipe",
										"Close",
										undefined,
										() => {
											deleteRecipe(e.id);
										},
										undefined,
										"Delete"
									);
								}}
							>
								Delete
							</button>
						</div>,
					];
				})}
				sortable={[true, true, true, false]}
				span={true}
				refresh={refreshTable}
				compact
				loading={loading}
			/>

			<Card
				title="Create new recipe"
				span={false}
				className="!h-fit"
			>
				<IngredientForm
					prefix="Create"
					onSubmit={onCreate}
				/>
			</Card>
			<Card
				title="Update a recipe"
				className="!h-fit"
			>
				<IngredientForm
					prefix="Update"
					onSubmit={onUpdate}
					onReset={() => setRecipeUpdate(undefined)}
					initialName={recipeUpdate ? recipeUpdate.name : undefined}
					initialIngredients={
						recipeUpdate
							? (recipeUpdate.ingredients as {
									key: string;
									value: string;
							  }[])
							: undefined
					}
					initialNotes={
						recipeUpdate
							? recipeUpdate.notes || undefined
							: undefined
					}
					id={recipeUpdate ? recipeUpdate.id : undefined}
				/>
			</Card>
		</GridLayout>
	);
}
