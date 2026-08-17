import { getAllArticles } from '../../lib/mdx';
import Blogs from '../../views/Blogs';

export const metadata = {
  title: 'TOPICS // SIDDHESH GOEL Archive',
  description: 'Topic-wise exploration of writings across Technology, Design, Building, Philosophy, and Systems.',
};

export default function TopicsPage() {
  const articles = getAllArticles();
  return <Blogs articles={articles} />;
}
