
import Link from 'next/link';
import { Post } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.postCard}>
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}...</p>
      <div className={styles.actions}>
        <Link href={`/posts/${post.id}`} className={styles.viewBtn}>
          View Post
        </Link>
        <Link href={`/posts/${post.id}/comments`} className={styles.commentsBtn}>
          View Comments
        </Link>
      </div>
    </div>
  );
} 