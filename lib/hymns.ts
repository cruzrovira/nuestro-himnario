import fs from "fs";
import matter from "gray-matter";
import path from "path";

const hymnsDirectory = path.join(process.cwd(), "content", "hymns");

export interface HymnMeta {
  slug: string;
  title: string;
  page?: number;
}

export interface Hymn extends HymnMeta {
  content: string;
}

export function getAllHymns(): HymnMeta[] {
  const files = fs.readdirSync(hymnsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(hymnsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const parsedPage = Number(data.page);
      const page = Number.isFinite(parsedPage) ? parsedPage : undefined;

      return {
        slug,
        title: data.title as string,
        page,
      };
    })
    .sort((a, b) => {
      if (a.page !== undefined && b.page !== undefined) {
        return a.page - b.page;
      }

      if (a.page !== undefined) {
        return -1;
      }

      if (b.page !== undefined) {
        return 1;
      }

      return a.title.localeCompare(b.title, "es");
    });
}

export function getHymn(slug: string): Hymn | null {
  const fullPath = path.join(hymnsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const parsedPage = Number(data.page);
  const page = Number.isFinite(parsedPage) ? parsedPage : undefined;

  return {
    slug,
    title: data.title as string,
    page,
    content,
  };
}
