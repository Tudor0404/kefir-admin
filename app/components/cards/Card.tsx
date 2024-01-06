import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
  span?: boolean;
  className?: string;
}

export default function Card(props: Props) {
  return (
    <div
      className={`card w-full min-h-[150px] h-full flex-grow p-3 shadow-lg bg-stone-50 rounded-md ${
        props.span && "lg:col-span-2"
      } ${props.className}`}
    >
      {props.title && <h4 className="text-accent-content">{props.title}</h4>}
      {props.children}
    </div>
  );
}
