"use client";

import { useRef } from "react";
import CopyButton from "./CopyButton";

export default function CodeBlock({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        className="liquid-glass-subtle rounded-xl p-5 overflow-x-auto"
        {...props}
      >
        {children}
      </pre>
      <CopyButton preRef={preRef} />
    </div>
  );
}
