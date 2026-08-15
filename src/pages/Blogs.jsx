import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import styles from './Blogs.module.css';

const Blogs = () => {
  const allBlogs = [
    {
      id: 1,
      title: 'The Brutalist Resurgence',
      date: 'Oct 12, 2026',
      category: 'Architecture',
    },
    {
      id: 2,
      title: 'Whitespace as Structure',
      date: 'Sep 28, 2026',
      category: 'Typography',
    },
    {
      id: 3,
      title: 'Monochrome Palette',
      date: 'Sep 15, 2026',
      category: 'Color Theory',
    },
    {
      id: 4,
      title: 'Grid Systems in Web',
      date: 'Aug 30, 2026',
      category: 'UI/UX',
    },
    {
      id: 5,
      title: 'Less but Better',
      date: 'Aug 12, 2026',
      category: 'Philosophy',
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <div className={styles.titleWrapper}>
          <motion.h1 
            className="heading-large"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Archive
          </motion.h1>
          <motion.span 
            className={`${styles.titleHighlight} text-highlight`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            index
          </motion.span>
        </div>
      </header>

      <div className={styles.blogGrid}>
        {allBlogs.map((blog, idx) => (
          <motion.div 
            key={blog.id} 
            className={styles.blogItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className={styles.blogMeta}>
              <span>{blog.category}</span>
              <span>{blog.date}</span>
            </div>
            <h2 className="heading-medium" style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)'}}>
              {blog.title}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
