"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import Card from "./Card";
import {
	TbChevronRight,
	TbChevronLeft,
	TbArrowUp,
	TbArrowDown,
} from "react-icons/tb";

interface Props<T extends string[]> {
	title: string;
	headers: T;
	data: { [K in keyof T]: ReactNode }[];
	sortable?: { [K in keyof T]: boolean };
	rowsPerPage?: number;
	span?: boolean;
	compact?: boolean;
	numbered?: boolean;
	style?: string;
	refresh?: () => any;
	loading?: boolean;
}

export default function CardStat<T extends string[]>(props: Props<T>) {
	const [sortField, setSortField] = useState<keyof T | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(15);

	const sortedData = props.data.sort((a, b) => {
		if (!sortField) return 0;

		const aValue = a[props.headers.indexOf(sortField.toString())];
		const bValue = b[props.headers.indexOf(sortField.toString())];

		if (aValue == null || bValue == null) {
			return 0;
		}

		if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
		if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	const paginatedData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	return (
		<Card
			span={props.span || props.headers.length > 4}
			title={props.title}
			className="flex flex-col gap-4"
		>
			<div className="overflow-x-auto w-full ">
				<table
					className={`table ${props.compact && "table-xs"} ${
						props.style
					}`}
				>
					<thead>
						<tr>
							{props.numbered && (
								<th className="select-none">#</th>
							)}
							{props.headers.map((e, i) => (
								<th
									key={i}
									className="select-none cursor-pointer"
									onClick={() => {
										if (
											props.sortable &&
											!props.sortable[i]
										)
											return;

										if (sortField === e) {
											setSortDirection(
												sortDirection === "asc"
													? "desc"
													: "asc"
											);
										} else {
											setSortField(e as keyof T);
											setSortDirection("asc");
										}
									}}
								>
									<div className="flex flex-ro justify-start items-center">
										{e}
										{sortField === e && (
											<span className="!h-fit ml-1">
												{sortDirection === "asc" ? (
													<TbArrowUp />
												) : (
													<TbArrowDown />
												)}
											</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{paginatedData.map((r, i) => (
							<tr key={i}>
								{props.numbered && <td>{i}</td>}
								{r.map((c, j) => (
									<td key={j}>{c}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="w-full flex flex-row justify-between items-center">
				<div className="join">
					<button
						className="join-item btn btn-sm"
						type="button"
						onClick={() => {
							setCurrentPage((prev) => Math.max(prev - 1, 1));
						}}
					>
						<TbChevronLeft />
					</button>
					<button className="join-item btn btn-sm">
						Page {currentPage}
					</button>
					<button
						className="join-item btn btn-sm"
						type="button"
						onClick={() =>
							setCurrentPage((prev) =>
								Math.max(
									Math.min(
										prev + 1,
										Math.ceil(
											props.data.length / itemsPerPage
										)
									),
									1
								)
							)
						}
					>
						<TbChevronRight />
					</button>
				</div>
				{props.loading && (
					<span className="loading loading-spinner text-base-300 loading-sm"></span>
				)}
				<div className="flex flex-row gap-1">
					<select
						className="select select-sm w-full max-w-xs"
						onChange={(e) =>
							setItemsPerPage(parseInt(e.target.value))
						}
						defaultValue={15}
					>
						<option>10</option>
						<option>15</option>
						<option>20</option>
						<option>30</option>
						<option>40</option>
					</select>
					{props.refresh && (
						<button
							className="btn btn-sm btn-base border-base-100 "
							onClick={props.refresh}
						>
							Refresh
						</button>
					)}
				</div>
			</div>
		</Card>
	);
}
