import { getAllArticles } from '../../lib/mdx';
import Blogs from '../../views/Blogs';

export const metadata = {
  title: 'ARTICLES // SIDDHESH GOEL Archive',
  description: 'Chronological archive of writings on software architectures, AI loops, systems engineering, and minimalist digital aesthetics.',
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return <Blogs articles={articles} />;
}
