// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/mdx/CodeBlock";
import Callout from "@/components/mdx/Callout";

export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="text-xl font-semibold mt-12 mb-4 tracking-[-0.01em]"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
      <h3
        className="text-lg font-semibold mt-10 mb-3 tracking-[-0.01em]"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p
        className="text-[15px] text-white/45 leading-[1.85] font-light my-4"
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
      <a
        className="text-white/60 underline underline-offset-2 decoration-white/15 hover:text-white/90 hover:decoration-white/40 transition-colors duration-300"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="liquid-glass-subtle border-l-2 border-white/10 pl-5 my-6 py-3 pr-4"
        {...props}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="my-4 space-y-2 list-disc pl-5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
      <ol className="my-4 space-y-2 list-decimal pl-5" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
      <li
        className="text-[15px] text-white/45 leading-[1.8] font-light"
        {...props}
      >
        {children}
      </li>
    ),
    strong: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"strong">) => (
      <strong className="text-white/70 font-medium" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: React.ComponentPropsWithoutRef<"em">) => (
      <em className="text-white/55 italic" {...props}>
        {children}
      </em>
    ),
    code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
      const isInlineCode = !("data-language" in props);
      if (isInlineCode) {
        return (
          <code
            className="text-[13px] text-white/60 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="text-[13px] font-mono leading-relaxed" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),
    table: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table
          className="w-full text-[14px] text-white/45 border-collapse"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: React.ComponentPropsWithoutRef<"th">) => (
      <th
        className="text-left text-[12px] text-white/30 font-medium uppercase tracking-wider border-b border-white/[0.06] px-3 py-2"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: React.ComponentPropsWithoutRef<"td">) => (
      <td
        className="border-b border-white/[0.04] px-3 py-2 text-[14px] text-white/40"
        {...props}
      >
        {children}
      </td>
    ),
    hr: () => <hr className="section-divider my-10 border-none" />,
    Callout,
    img: ({ alt, ...props }: React.ComponentPropsWithoutRef<"img">) => (
      <figure className="my-8">
        <img
          className="rounded-xl w-full"
          loading="lazy"
          alt={alt ?? ""}
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-[12px] text-white/20 mt-3">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  };
}
