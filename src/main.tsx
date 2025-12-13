import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Experiment from "./components/Experiment.tsx";
import Home from "./Home.tsx";
import "./index.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.min.css";
import { experiments } from "./Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/three-playground">
      <Routes>
        <Route path="/" element={<Home />} />
        {experiments.map(({ path, component, title }) => (
          <Route
            path={path}
            element={<Experiment title={title}>{component}</Experiment>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
