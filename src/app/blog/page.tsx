import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Threat write-ups, vendor-agnostic guidance, and detection-engineering retrospectives from the SEC.co team.",
};

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Threat write-ups, retrospectives, and{" "}
            <span className="brand-gradient-text">work-out-loud notes</span>.
          </>
        }
        sub={`${posts.length} posts from the SEC.co practice. Vendor-agnostic, practitioner-written, and updated regularly. Less hype, more 'here's what we actually saw this quarter'.`}
        primaryCta={{ href: "/contact?topic=newsletter", label: "Subscribe to the newsletter" }}
      />

      <Container width="wide" className="py-16 md:py-24">
        <ul className="grid gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-ink-1/40 p-5 transition-all hover:-translate-y-0.5 hover:border-bone-dim hover:bg-ink-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-[18px] leading-snug tracking-tight text-bone group-hover:text-white sm:text-[19px]">
                    {post.title}
                  </h2>
                  {post.description &&
                    !post.description.startsWith("SEC.co is a cybersecurity") && (
                      <p className="mt-2 text-[13.5px] leading-relaxed text-bone-dim line-clamp-2">
                        {post.description}
                      </p>
                    )}
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[12px] text-mute sm:flex-col sm:items-end sm:gap-1 sm:pt-1">
                  {post.date && (
                    <time dateTime={post.date} className="font-mono">
                      {post.date}
                    </time>
                  )}
                  <span>{readingMinutes(post.body)} min read</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
