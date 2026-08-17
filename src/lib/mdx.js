import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllArticles() {
  const articlesDir = path.join(process.cwd(), 'src/content/articles');
  let articles = [];

  try {
    const filenames = fs.readdirSync(articlesDir);
    articles = filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => {
        const filePath = path.join(articlesDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Parse "01 // TECHNOLOGY" into "TECHNOLOGY"
        const cleanCategory = data.category ? data.category.split('//')[1]?.trim() || data.category : 'MISC';

        // Extract year and month from date string
        const dateObj = new Date(data.date || new Date());
        const year = dateObj.getFullYear().toString();
        const month = dateObj.toLocaleString('default', { month: 'long' }).toUpperCase();
        
        // Format date string as "AUG 17, 2026"
        const formattedDate = dateObj.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace('.', '');

        return {
          id: data.id || filename.replace('.mdx', ''),
          category: cleanCategory,
          title: data.title,
          subtitle: data.summary,
          date: formattedDate,
          readTime: data.readTime || '5 MIN',
          year,
          month,
          link: `/article/${data.id || filename.replace('.mdx', '')}`
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (e) {
    console.error('Error reading articles:', e);
  }
  
  return articles;
}
