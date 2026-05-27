import Link from "next/link";

type ServiceCardProps = {
  href: string;
  title: string;
  description: string;
  meta?: string; // small label, e.g. "Retainer · 24/7"
  emphasis?: "default" | "urgent";
};

export function ServiceCard({
  href,
  title,
  description,
  meta,
  emphasis = "default",
}: ServiceCardProps) {
  const isUrgent = emphasis === "urgent";
  return (
    <Link
      href={href}
      className={`group relative flex flex-col gap-2 rounded-2xl border bg-ink-1/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-1 ${
        isUrgent
          ? "border-[rgba(255,107,53,0.45)] hover:border-[var(--color-ember)]"
          : "border-[var(--color-line)] hover:border-bone-dim"
      }`}
    >
      {/* Gradient corner on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isUrgent
            ? "radial-gradient(70% 50% at 100% 0%, rgba(255,107,53,0.10), transparent 60%)"
            : "radial-gradient(70% 50% at 100% 0%, rgba(96,41,255,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <h3 className="font-display text-[18px] leading-tight tracking-tight text-bone">
          {title}
        </h3>
        <span
          aria-hidden
          className={`mt-0.5 text-[14px] transition-transform duration-200 group-hover:translate-x-0.5 ${
            isUrgent ? "text-[var(--color-ember)]" : "text-mute group-hover:text-bone"
          }`}
        >
          →
        </span>
      </div>
      <p className="relative text-[13.5px] leading-relaxed text-bone-dim">
        {description}
      </p>
      {meta && (
        <div className="relative mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
          {meta}
        </div>
      )}
    </Link>
  );
}
