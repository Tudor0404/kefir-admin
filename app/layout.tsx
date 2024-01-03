"use client";

import "./globals.css";
import type { Metadata, NextPageContext } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbMenu2 } from "react-icons/tb";
import { AlertProvider } from "./components/alert/AlertContext";
import AlertHandler from "./components/alert/AlertHandler";
import { ModalProvider } from "./components/modal/ModalContext";
import { StatusBar } from "./components/status-bar/StatusBar";

// export const metadata: Metadata = {
// 	title: "Kefir Admin",
// 	description: "Admin panel to monitor kefir fermentation",
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const routes = [
		{ label: "Dashboard", path: "/" },
		{ label: "Batches", path: "/batches" },
		{ label: "Recipes", path: "/recipes" },
		{ label: "Containers", path: "/containers" },
		{ label: "Stations", path: "/stations" },
	];

	const pathname = usePathname();
	const currentPageName = routes.find((e) => e.path == pathname);

	return (
		<html>
			<body className="drawer md:drawer-open pb-3 ">
			<AlertProvider>
				<ModalProvider>
					
						<input
							id="nav-drawer"
							type="checkbox"
							className="drawer-toggle"
						/>
						<div className="drawer-content flex flex-col justify-start items-center w-full  bg-base-100">
							<div className="w-full flex justify-between p-2 h-fit">
								<div className="w-16 flex justify-start items-center">
									<label
										htmlFor="nav-drawer"
										className="btn btn-square drawer-button md:hidden w-fit h-fit min-h-fit p-1"
									>
										<TbMenu2 size={24} />
									</label>
								</div>
								<div className=" flex justify-center items-center">
									<h1>
										{currentPageName
											? currentPageName.label
											: ""}
									</h1>
								</div>
								<div className="w-16"></div>
							</div>
							<div className="container p-4">{children}</div>
						</div>
						<div className="drawer-side">
							<label
								htmlFor="nav-drawer"
								className="drawer-overlay"
							></label>
							<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
								{routes.map((route) => (
									<li
										key={route.path}
										className="mb-2"
									>
										<Link
											href={route.path}
											className={
												pathname === route.path
													? "!bg-neutral !text-neutral-content"
													: ""
											}
										>
											<h4>{route.label}</h4>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<StatusBar/>
						<AlertHandler />
						</ModalProvider>
					</AlertProvider>
			</body>
		</html>
	);
}
