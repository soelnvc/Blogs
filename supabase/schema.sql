-- ==============================================================================
-- SUPABASE PGVECTOR SCHEMA & SEMANTIC SEARCH FUNCTION
-- ==============================================================================

-- 1. Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- 2. Create the articles table
create table if not exists public.articles (
  id text primary key,
  title text not null,
  summary text,
  category text,
  topics text[],
  date text,
  read_time text,
  image_url text,
  image_alt text,
  content text,
  embedding vector(384), -- 384 dimensions matching Xenova/all-MiniLM-L6-v2
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS) and allow public read access
alter table public.articles enable row level security;

create policy "Allow public read access on articles" 
  on public.articles 
  for select 
  using (true);

-- 4. Create an index for faster similarity search queries using cosine distance
create index if not exists articles_embedding_idx 
  on public.articles 
  using hnsw (embedding vector_cosine_ops);

-- 5. Create a PostgreSQL function for Cosine Similarity Vector Search
create or replace function match_articles (
  query_embedding vector(384),
  match_threshold float default 0.25,
  match_count int default 10
)
returns table (
  id text,
  title text,
  summary text,
  category text,
  topics text[],
  date text,
  read_time text,
  image_url text,
  image_alt text,
  similarity float
)
language sql stable
as $$
  select
    articles.id,
    articles.title,
    articles.summary,
    articles.category,
    articles.topics,
    articles.date,
    articles.read_time,
    articles.image_url,
    articles.image_alt,
    1 - (articles.embedding <=> query_embedding) as similarity
  from articles
  where 1 - (articles.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
