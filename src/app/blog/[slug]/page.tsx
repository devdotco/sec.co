import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getAllSlugs, getPost, renderMarkdown } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description:
      post.description.startsWith("SEC.co is a cybersecurity")
        ? `${post.title} — SEC.co blog.`
        : post.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body);

  return (
    <article className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-aurora opacity-50" />
      <Container width="content" className="pt-10 pb-24 md:pt-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-[12.5px] text-mute">
          <Link href="/blog" className="hover:text-bone">
            ← All posts
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12 border-b border-[var(--color-line)] pb-10">
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.03em] text-bone">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-mute">
            {post.date && (
              <time dateTime={post.date} className="font-mono">
                {post.date}
              </time>
            )}
            <span>SEC.co</span>
          </div>
        </header>

        {/* Rendered markdown body */}
        <div
          className="prose-sec"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Footer CTA */}
        <footer className="mt-20 border-t border-[var(--color-line)] pt-10">
          <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
              Working on this?
            </div>
            <h2 className="mt-2 font-display text-[24px] leading-tight tracking-tight text-bone">
              We do this every day for clients.
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-bone-dim">
              SEC.co runs a 24/7 SOC, an incident response retainer, and a vCISO bench. If the
              topics in this post are an active concern, the shortest path to a working answer is
              a 30-minute call.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact?topic=assessment"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-[13.5px] font-semibold text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
              >
                Book the call →
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-11 items-center rounded-full border border-[var(--color-line-strong)] px-5 text-[13.5px] font-medium text-bone hover:bg-ink-2 hover:border-bone-dim transition-colors"
              >
                More from the blog
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </article>
  );
}
