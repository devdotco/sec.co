import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "content" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-[860px]",
  content: "max-w-[1240px]",
  wide: "max-w-[1360px]",
} as const;

export function Container({
  width = "content",
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <div
      className={`${widths[width]} mx-auto px-6 md:px-8 lg:px-10 ${className}`}
      {...rest}
    />
  );
}
