import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export default function GridLayout({ children }: Props) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
			{children}
		</div>
	);
}
