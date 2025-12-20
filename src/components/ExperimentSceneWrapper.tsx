import type { PropsWithChildren, Ref } from "react";

interface ExperimentSceneProps extends PropsWithChildren {
  fullWidth?: boolean;
  pan?: boolean;
  zoom?: boolean;
  rotate?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

function ExperimentSceneWrapper({
  children,
  fullWidth = false,
  className = "",
  ref,
}: ExperimentSceneProps) {
  return (
    <div
      ref={ref}
      className={`aspect-video mx-auto mb-10 ${
        fullWidth ? "w-full" : "w-full md:w-3/4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default ExperimentSceneWrapper;
