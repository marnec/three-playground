import type { PropsWithChildren } from "react";

interface ExperimentSceneProps extends PropsWithChildren {
  fullWidth?: boolean;
}

function ExperimentScene({ children, fullWidth = false }: ExperimentSceneProps) {
  return (
    <div className={`aspect-video mx-auto mb-10 ${fullWidth ? "w-full" : "w-full md:w-3/4"}`}>
      {children}
    </div>
  );
}

export default ExperimentScene;
