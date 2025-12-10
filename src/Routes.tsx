import type { ReactElement } from "react";
import SinWaveGrid from "./experiments/SinWave/SinWavePoints";
import Test from "./experiments/Test/Test";

type Experiment = {
  path: string;
  title: string;
  component: ReactElement;
};

export const experiments = [
  { path: "test", title: "Test", component: <Test /> },
  { path: "sinwave", title: "Sine Wave", component: <SinWaveGrid /> },
] satisfies Experiment[];
