import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  id?: string;
};

export function SectionHeader({ eyebrow, title, sub, id }: SectionHeaderProps) {
  return (
    <div id={id} className="mb-10 max-w-3xl scroll-mt-24">
      {eyebrow && (
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-bone">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-bone-dim">
          {sub}
        </p>
      )}
    </div>
  );
}
