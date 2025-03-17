import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types';
import styles from './PostPage.module.css';

// This is for static site generation (SSG)
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();
  
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

async function getPost(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post: Post | null = await getPost(params.id);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.postCard}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.body}>
          <p>{post.body}</p>
        </div>
        
        <div className={styles.actions}>
          <Link 
            href={`/posts/${post.id}/comments`}
            className={styles.commentsButton}
          >
            View Comments
          </Link>
          <Link 
            href="/"
            className={styles.backButton}
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
} 