import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { generateEmbedding } from '../../../lib/embeddings';
import { getAllArticles } from '../../../lib/mdx';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || !query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const cleanQuery = query.trim();

  // Try Semantic Search via Supabase pgvector
  if (supabase) {
    try {
      const queryEmbedding = await generateEmbedding(cleanQuery);

      const { data, error } = await supabase.rpc('match_articles', {
        query_embedding: queryEmbedding,
        match_threshold: 0.15,
        match_count: 10,
      });

      if (!error && Array.isArray(data) && data.length > 0) {
        const results = data.map((item) => {
          const dateObj = new Date(item.date || new Date());
          const year = dateObj.getFullYear().toString();
          const month = dateObj.toLocaleString('default', { month: 'long' }).toUpperCase();
          const formattedDate = dateObj.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace('.', '');
          const cleanCategory = item.category ? item.category.split('//')[1]?.trim() || item.category : 'MISC';

          return {
            id: item.id,
            title: item.title,
            subtitle: item.summary,
            category: cleanCategory,
            topics: item.topics || [],
            date: formattedDate,
            readTime: item.read_time || '5 MIN',
            year,
            month,
            imageUrl: item.image_url,
            imageAlt: item.image_alt,
            similarity: item.similarity,
            link: `/article/${item.id}`,
          };
        });

        return NextResponse.json({ results, type: 'semantic' });
      }
    } catch (err) {
      console.warn('Semantic search fallback triggered:', err.message);
    }
  }

  // Graceful Fallback: Local Keyword Search over MDX files
  const allArticles = getAllArticles();
  const lowerQ = cleanQuery.toLowerCase();

  const filtered = allArticles.filter((art) => {
    return (
      art.title?.toLowerCase().includes(lowerQ) ||
      art.subtitle?.toLowerCase().includes(lowerQ) ||
      art.category?.toLowerCase().includes(lowerQ)
    );
  });

  return NextResponse.json({
    results: filtered,
    type: 'fallback',
  });
}
