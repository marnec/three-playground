import type { PropsWithChildren } from "react";
import { Link } from "react-router";

export interface ExperimentProps extends PropsWithChildren {
  title: string;
}

function Experiment({ title, children }: ExperimentProps) {
  return (
    <div className="h-full w-full container mx-auto">
      <div className="text-2xl font-bold flex gap-5 py-3">
        <Link to="../">
          <button className="hover:text-blue-600 cursor-pointer pl-0">
            <span>{decodeURIComponent("%3C")}-</span>
          </button>
        </Link>
        <div>{title}</div>
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

export default Experiment;
