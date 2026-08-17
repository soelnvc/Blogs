import { getAllArticles } from '../lib/mdx';
import Home from '../views/Home';

export default function Page() {
  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 4); // Get up to 4 latest articles
  
  return <Home latestArticles={latestArticles} allArticles={allArticles} />;
}
