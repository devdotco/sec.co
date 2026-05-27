/**
 * Blog content loader.
 *
 * Reads markdown files from src/content/blog/ at build time.
 * Each file has gray-matter frontmatter:
 *   ---
 *   slug, title, date, description, source
 *   ---
 *   <markdown body>
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  source: string;
  /** Markdown body (raw). */
  body: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<BlogPost>;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    source: data.source ?? "",
    body: parsed.content,
  };
}

export function getPost(slug: string): BlogPost | null {
  return readPost(slug);
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map(readPost)
    .filter((p): p is BlogPost => !!p)
    .sort((a, b) => {
      // Posts with dates first, then alphabetical
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

/** Convert markdown body to sanitized HTML. */
export async function renderMarkdown(md: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(md);
  return String(result);
}
