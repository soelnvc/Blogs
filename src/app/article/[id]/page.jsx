import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Article from '../../../views/Article';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const filePath = path.join(process.cwd(), 'src/content/articles', `${id}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: `${data.title || `ARTICLE #${id}`} // SIDDHESH GOEL`,
      description: data.summary || 'Article archive.',
    };
  } catch (e) {
    return {
      title: `ARTICLE #${id} // SIDDHESH GOEL`,
      description: 'Article not found.',
    };
  }
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  let source = '';
  let frontmatter = {};
  
  try {
    const filePath = path.join(process.cwd(), 'src/content/articles', `${id}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    source = parsed.content;
    frontmatter = parsed.data;
  } catch (e) {
    source = '# Article Not Found\n\nThe requested article could not be located in the CMS.';
  }

  return (
    <Article frontmatter={frontmatter}>
      <MDXRemote source={source} />
    </Article>
  );
}
