import { ReactNode } from "react";
import Card from "./Card";

interface Props {
  icon?: ReactNode;
  stat: string;
  title: string;
  alt?: string;
}

export default function CardStat(props: Props) {
  const noAlt = {
    gridTemplate: "auto auto / auto auto",
  };

  const withAlt = {
    gridTemplate: "auto auto / auto",
  };

  function textToColour(text: string) {
    if (text[0] == "-") {
      return "text-error";
    } else if (/[a-zA-Z]/.test(text)) {
      return "text-neutral";
    } else if (!/[1-9]/.test(text)) {
      return "text-info";
    } else {
      return "text-success";
    }
  }

  return (
    <Card>
      <div
        className={`grid grid-rows-2 gap-4 px-4 py-2 `}
        style={props.alt ? withAlt : noAlt}
      >
        {props.icon && (
          <div className="flex flex-col justify-center items-center [&>*]:w-8 [&>*]:h-8 [&>*]:text-primary rounded-full bg-primary-content/40 w-12 h-12">
            {props.icon}
          </div>
        )}
        <div className="col-start-1 row-start-2 flex flex-col">
          <span className="text-3xl font-thin font-mono">{props.stat}</span>
          <h5>{props.title}</h5>
        </div>
        {props.alt && (
          <div
            className={`col-start-2 row-start-2 flex justify-end items-end font-semibold ${textToColour(
              props.alt
            )}`}
          >
            {props.alt}
          </div>
        )}
      </div>
    </Card>
  );
}
