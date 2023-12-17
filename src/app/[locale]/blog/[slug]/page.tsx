import { globSync } from "fast-glob";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import * as fs from "fs";

export async function getBlogPost(locale: string, slug: string) {
  const file = globSync(
    path.join(process.cwd(), "blog", locale, `${slug}.mdx`),
  )?.[0];
  if (!file) {
    return notFound();
  }
  return compileMDX({
    source: fs.readFileSync(file, "utf-8"),
    options: { parseFrontmatter: true },
  });
}

export default async function BlogPost({ params: { locale, slug } }) {
  const post = await getBlogPost(locale, slug);
  return <article className="prose dark:prose-invert prose-xl mx-auto">{post.content}</article>;
}
