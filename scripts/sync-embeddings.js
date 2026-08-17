import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import { generateEmbedding } from '../src/lib/embeddings.js';

// Simple .env.local loader for standalone Node script execution
function loadEnv() {
  const envPaths = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...values] = trimmed.split('=');
          if (key && values.length) {
            process.env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      });
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\x1b[31m[ERROR]\x1b[0m Missing Supabase credentials in .env.local!');
  console.error('Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncArticles() {
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
  console.log('\x1b[36m%s\x1b[0m', '  SYNCING ARTICLES & GENERATING 100% FREE LOCAL EMBEDDINGS');
  console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════\n');

  const articlesDir = path.join(process.cwd(), 'src/content/articles');
  if (!fs.existsSync(articlesDir)) {
    console.error(`Articles directory not found: ${articlesDir}`);
    return;
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  console.log(`Found \x1b[32m${files.length}\x1b[0m article(s) to process.\n`);

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(rawContent);

    const id = data.id || file.replace('.mdx', '');
    const title = data.title || 'Untitled';
    const summary = data.summary || '';
    const category = data.category ? data.category.split('//')[1]?.trim() || data.category : 'MISC';
    const topics = data.topics || [];
    const date = data.date || new Date().toISOString();
    const readTime = data.readTime || '5 MIN';
    const imageUrl = data.image || '';
    const imageAlt = data.imageAlt || '';

    // Create rich semantic context string for embedding
    const semanticText = [
      `Title: ${title}`,
      `Category: ${category}`,
      topics.length ? `Topics: ${topics.join(', ')}` : '',
      summary ? `Summary: ${summary}` : '',
      imageAlt ? `Image visual description: ${imageAlt}` : '',
      `Content: ${content.slice(0, 3000)}` // Context window slice
    ].filter(Boolean).join(' | ');

    process.stdout.write(`⚙ Generating local embedding for article [${id}] "${title}"... `);

    try {
      const embedding = await generateEmbedding(semanticText);
      process.stdout.write('\x1b[32mDONE\x1b[0m\n');

      const payload = {
        id,
        title,
        summary,
        category,
        topics,
        date,
        read_time: readTime,
        image_url: imageUrl,
        image_alt: imageAlt,
        content,
        embedding,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('articles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.error(`\x1b[31m[FAILED]\x1b[0m Upsert error for [${id}]:`, error.message);
      } else {
        console.log(`  ✓ Successfully synced [${id}] to Supabase pgvector table.\n`);
      }
    } catch (err) {
      console.error(`\x1b[31m[FAILED]\x1b[0m Embedding error:`, err);
    }
  }

  console.log('\x1b[32m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
  console.log('\x1b[32m%s\x1b[0m', '  ALL ARTICLES SYNCED & VECTORIZED SUCCESSFULLY!');
  console.log('\x1b[32m%s\x1b[0m', '═══════════════════════════════════════════════════════════════════');
}

syncArticles().catch(console.error);
