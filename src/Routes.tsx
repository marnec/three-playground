import type { ReactElement } from "react";
import SinWave from "./experiments/SinWave/SinWave.mdx";
import SinWavePlane from "./experiments/SinWave/SinWavePlane";

type Experiment = {
  path: string;
  title: string;
  description: string;
  component: ReactElement;
  example: ReactElement;
};

export const experiments = [
  // {
  //   path: "test",
  //   title: "Test",
  //   description: "Just a test",
  //   component: <Test />,
  // },
  {
    path: "sinwave",
    title: "Sine Wave",
    description: "A wave-like animated pattern",
    component: <SinWave />,
    example: <SinWavePlane />
  },
] satisfies Experiment[];
