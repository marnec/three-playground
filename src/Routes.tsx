import type { ReactElement } from "react";
import SinWave from "./experiments/SinWave/SinWave";
import Test from "./experiments/Test/Test";

type Experiment = {
  path: string;
  title: string;
  description: string;
  component: ReactElement;
};

export const experiments = [
  {
    path: "test",
    title: "Test",
    description: "Just a test",
    component: <Test />,
  },
  {
    path: "sinwave",
    title: "Sine Wave",
    description: "A wave-like animated pattern",
    component: <SinWave />,
  },
] satisfies Experiment[];
