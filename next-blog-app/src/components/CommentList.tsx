'use client';

import { Comment } from '@/types';
import styles from './CommentList.module.css';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className={styles.commentsContainer}>
      <h3>Comments ({comments.length})</h3>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <h4>{comment.name}</h4>
          <p className={styles.email}>{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}

    </div>
  );
} 