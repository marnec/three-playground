import type { PropsWithChildren } from "react";

export interface ExperimentProps extends PropsWithChildren {
  title: string;
}

function Experiment({ title, children }: ExperimentProps) {
  return (
    <div className="h-full w-full">
      {/* <div className="p-3 text-2xl text">{title}</div> */}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

export default Experiment;
