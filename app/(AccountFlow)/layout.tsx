import { Children, ReactNode } from "react";

export default function RootLayout(props: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="w-full mx-2 xs:mx-0 xs:w-80 bg-neutral-200 shadow-lg outline outline-neutral-300 rounded-md p-4">
        {props.children}
      </div>
    </div>
  );
}
