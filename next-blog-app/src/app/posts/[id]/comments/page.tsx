import { Post, Comment } from '@/types';
import Link from 'next/link';
import CommentList from '@/components/CommentList';
import { notFound } from 'next/navigation';

// This is equivalent to getServerSideProps in the Pages Router
async function getPostAndComments(id: string): Promise<{ post: Post; comments: Comment[] }> {
  // Fetch post details
  const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store' // This makes it server-side rendered on every request
  });
  
  if (!postRes.ok) {
    notFound();
  }
  
  const post: Post = await postRes.json();
  
  // Fetch comments for the post
  const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    cache: 'no-store'
  });
  
  const comments: Comment[] = await commentsRes.json();
  
  return { post, comments };
}

export default async function CommentsPage({ params }: { params: { id: string } }) {
  const { post, comments } = await getPostAndComments(params.id);
  
  return (
    <div className="comments-page">
      <h1>Comments for: {post.title}</h1>
      <div className="post-summary">
        <p>{post.body.substring(0, 150)}...</p>
      </div>
      
      <div className="actions">
        <Link href="/" className="btn home-btn">
          Home
        </Link>
        <Link href={`/posts/${post.id}`} className="btn post-btn">
          View Full Post
        </Link>
      </div>
      
      <CommentList comments={comments} />

      
    </div>
  );
} 