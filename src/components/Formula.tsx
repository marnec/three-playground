import { MathJax } from "better-react-mathjax";
import type { PropsWithChildren } from "react";

export function M({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex justify-center py-3">
      <MathJax>
        {"\\("}
        {children}
        {"\\)"}
      </MathJax>
    </div>
  );
}

interface InlineMathProps extends PropsWithChildren {
  p?: boolean;
  s?: boolean;
}

export function IM({
  children,
  p: prefixSpace = false,
  s: suffixSpace = false,
}: InlineMathProps) {
  return (
    <MathJax inline>
      {prefixSpace ? " " : ""}
      {"\\("} {children} {"\\)"}
      {suffixSpace ? " " : ""}
    </MathJax>
  );
}
