import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import { MathJax } from "better-react-mathjax";
import type { ReactElement } from "react";

interface MarkdownProps {
  children: string;
  slots?: Record<string, ReactElement>;
}

type Part =
  | { type: "markdown"; content: string }
  | { type: "slot"; name: string };

function parseSlots(content: string): Part[] {
  const slotPattern = /<Slot\s+name="([^"]+)"\s*\/>/g;
  const parts: Part[] = [];
  let lastIndex = 0;
  let match;

  while ((match = slotPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "markdown",
        content: content.slice(lastIndex, match.index),
      });
    }
    parts.push({ type: "slot", name: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "markdown", content: content.slice(lastIndex) });
  }

  return parts;
}

export function Markdown({ children, slots = {} }: MarkdownProps) {
  const parts = parseSlots(children);

  return (
    <MathJax>
      <div>
        {parts.map((part, index) => {
          if (part.type === "markdown") {
            return (
              <ReactMarkdown
                key={index}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[
                  [
                    rehypeHighlight,
                    { ignoreMissing: true, subset: false, plainText: ["math"] },
                  ],
                ]}
                components={{
                  code: ({ className, children }) => {
                    if (className === "language-math math-inline") {
                      return <MathJax inline>{`\\(${children}\\)`}</MathJax>;
                    }
                    if (className === "language-math math-display") {
                      return (
                        <div className="w-full flex justify-center py-3">
                          <MathJax>{`\\[${children}\\]`}</MathJax>
                        </div>
                      );
                    }
                    return <code className={className}>{children}</code>;
                  },
                  pre: ({ node, children }) => {
                    // Check if this pre contains a math block (code with math-display class)
                    const codeChild = node?.children?.[0];
                    if (
                      codeChild?.type === "element" &&
                      codeChild.tagName === "code" &&
                      Array.isArray(codeChild.properties?.className) &&
                      codeChild.properties.className.includes("math-display")
                    ) {
                      return <>{children}</>;
                    }
                    return <pre>{children}</pre>;
                  },
                  br: () => null,
                }}
              >
                {part.content}
              </ReactMarkdown>
            );
          } else {
            const SlotComponent = slots[part.name];
            return SlotComponent ? (
              <div key={index} className="w-full md:w-1/2 aspect-video mx-auto">
                {SlotComponent}
              </div>
            ) : null;
          }
        })}
      </div>
    </MathJax>
  );
}
