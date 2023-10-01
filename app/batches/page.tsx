import CardTable from "../components/cards/CardTable";
import GridLayout from "../components/layouts/GridLayout";

export default function Page() {
	return (
		<GridLayout>
			<CardTable
				headers={["ID", "Start Date", "End Date", "Flavour"]}
				title="All Batches"
				data={[]}
				span={true}
				rowsPerPage={20}
				compact={true}
			/>
		</GridLayout>
	);
}
