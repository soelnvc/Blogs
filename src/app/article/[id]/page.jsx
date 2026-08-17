import Article from '../../../views/Article';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `ARTICLE #${id} // SIDDHESH GOEL`,
    description: 'Autonomous loops, tool calling, API hallucination traps, and what actually works in production.',
  };
}

export default function ArticlePage() {
  return <Article />;
}
