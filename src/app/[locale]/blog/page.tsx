import * as path from "path";
import { globSync } from "fast-glob";
import { compileMDX } from "next-mdx-remote/rsc";
import * as fs from "fs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@/lib/navigation";

interface PostFrontmatter {
  title: string;
  excerpt: string;
  slug: string;
}

async function getBlogPosts(locale: string) {
  const files = globSync(path.join(process.cwd(), "blog", locale, "*.mdx"));
  const posts: PostFrontmatter[] = [];
  for await (const file of files) {
    const { frontmatter } = await compileMDX<PostFrontmatter>({
      source: fs.readFileSync(file, "utf-8"),
      options: { parseFrontmatter: true },
    });
    posts.push({ ...frontmatter, slug: path.basename(file, ".mdx") });
  }
  return posts;
}

export default async function Blog({ params: { locale } }) {
  const posts = await getBlogPosts(locale);
  return (
    <div className="grid grid-cols-3 gap-5">
      {posts.map(post => (
        <Card>
          <CardHeader>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </CardHeader>
          <CardBody>{post.excerpt}</CardBody>
        </Card>
      ))}
    </div>
  );
}
