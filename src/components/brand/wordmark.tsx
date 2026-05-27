import Image from "next/image";
import Link from "next/link";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "on-dark" | "on-light" | "mono-white" | "mono-black";
  className?: string;
};

/**
 * SEC.co primary wordmark. Sources: /public/brand/wordmark-*.png
 * Aspect ratio is ~4.05:1 (1620×400). Height drives sizing; width is computed.
 */
const heights = { sm: 24, md: 30, lg: 40 } as const;
const aspect = 1620 / 400;

const SRC: Record<NonNullable<WordmarkProps["variant"]>, string> = {
  "on-dark": "/brand/wordmark-on-dark.png",
  "on-light": "/brand/wordmark-on-light.png",
  "mono-white": "/brand/wordmark-mono-white.png",
  "mono-black": "/brand/wordmark-mono-black.png",
};

export function Wordmark({
  size = "md",
  href = "/",
  variant = "on-dark",
  className = "",
}: WordmarkProps) {
  const h = heights[size];
  const w = Math.round(h * aspect);
  const img = (
    <Image
      src={SRC[variant]}
      alt="SEC.co"
      width={w}
      height={h}
      priority
      className={`block h-auto w-auto ${className}`}
      style={{ height: `${h}px`, width: "auto" }}
    />
  );
  return href ? (
    <Link href={href} aria-label="SEC.co — home" className="group inline-flex items-center">
      {img}
    </Link>
  ) : (
    img
  );
}
