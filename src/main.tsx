import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Experiment from "./components/Experiment.tsx";
import Home from "./Home.tsx";
import "./index.css";
import "highlight.js/styles/github.min.css";
import { experiments } from "./Routes.tsx";
import { MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MathJaxContext config={mathJaxConfig}>
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
    </MathJaxContext>
  </StrictMode>
);
