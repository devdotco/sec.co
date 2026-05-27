import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Tone = "primary" | "ghost" | "emergency" | "gradient";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  tone?: Tone;
  size?: Size;
  children: ReactNode;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
};

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  };

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const tones: Record<Tone, string> = {
  primary:
    "bg-bone text-ink-0 hover:bg-white hover:-translate-y-px shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset]",
  ghost:
    "border border-[var(--color-line-strong)] text-bone hover:bg-ink-2 hover:border-bone-dim",
  emergency:
    "bg-[var(--color-ember)] text-ink-0 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px shadow-[0_0_0_1px_rgba(255,107,53,0.5),0_8px_24px_-8px_rgba(255,107,53,0.55)]",
  gradient:
    "brand-gradient text-ink-0 hover:-translate-y-px shadow-[0_8px_28px_-8px_rgba(96,41,255,0.55)]",
};

export function Button({
  tone = "primary",
  size = "md",
  href,
  className = "",
  children,
  trailingIcon,
  leadingIcon,
  ...rest
}: ButtonLinkProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 ease-[var(--ease-out-quint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink-0 ${sizes[size]} ${tones[tone]} ${className}`;
  return (
    <Link href={href} className={cls} {...rest}>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </Link>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`${className} transition-transform duration-200 group-hover:translate-x-0.5`}
    >
      <path
        d="M5 3 L9 7 L5 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
