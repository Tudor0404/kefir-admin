"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbMenu2 } from "react-icons/tb";
import { StatusBar } from "../components/status-bar/StatusBar";
import { ReactNode } from "react";

export default function DashboardLayout(props: { children: ReactNode }) {
  const routes = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Batches", path: "/dashboard/batches" },
    { label: "Recipes", path: "/dashboard/recipes" },
    { label: "Containers", path: "/dashboard/containers" },
    { label: "Stations", path: "/dashboard/stations" },
  ];

  const pathname = usePathname();
  const currentPageName = routes.find((e) => e.path == pathname);

  return (
    <div className="drawer md:drawer-open pb-3">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col justify-start items-center w-full bg-base-100">
        <div className="w-full flex justify-between p-2 h-fit">
          <div className="w-16 flex justify-start items-center">
            <label
              htmlFor="nav-drawer"
              className="btn btn-square drawer-button md:hidden w-fit h-fit min-h-fit p-1"
            >
              <TbMenu2 size={24} />
            </label>
          </div>
          <div className="flex justify-center items-center">
            <h1>{currentPageName ? currentPageName.label : ""}</h1>
          </div>
          <div className="w-16"></div>
        </div>
        <div className="container p-4">{props.children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>
        <ul className="menu p-2 w-60 min-h-full bg-base-200 text-base-content">
          {routes.map((route) => (
            <li key={route.path} className={`mb-1`}>
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
      <StatusBar />
    </div>
  );
}
