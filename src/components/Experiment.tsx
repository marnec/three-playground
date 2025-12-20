import type { PropsWithChildren } from "react";
import { Link } from "react-router";

export interface ExperimentProps extends PropsWithChildren {
  title: string;
  fullWidth?: boolean;
}

function Experiment({ title, children, fullWidth = false }: ExperimentProps) {
  return (
    <div className={`h-full mx-auto ${fullWidth ? "" : "max-w-4xl"}`}>
      <div className="text-2xl font-bold flex gap-5 py-3">
        <Link to="../">
          <button className="hover:text-primary cursor-pointer pl-0">
            <span>{decodeURIComponent("%3C")}-</span>
          </button>
        </Link>
        <div>{title}</div>
      </div>
      <div className="h-full w-full mdx-content">{children}</div>
    </div>
  );
}

export default Experiment;
