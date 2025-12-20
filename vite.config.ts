import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

// https://vite.dev/config/
export default defineConfig({
  base: "/three-playground/",
  plugins: [
    { enforce: "pre", ...mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        [rehypeKatex, { macros: { "\\nint": "\\lfloor #1 \\rceil" } }],
        rehypeHighlight
      ],
    })},
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
});
