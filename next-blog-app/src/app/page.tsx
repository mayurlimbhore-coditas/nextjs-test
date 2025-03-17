
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import styles from './page.module.css';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store' // This makes it server-side rendered on every request
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div className={styles.homePage}>
      <h1>Latest Posts</h1>
      <div className={styles.postsGrid}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 