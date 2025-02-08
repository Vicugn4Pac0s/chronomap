import React from 'react';
import { api } from "~/trpc/react";

interface PostListProps {
  className?: string;
}

const PostList: React.FC<PostListProps> = ({ className }) => {
  const [Post] = api.post.get.useSuspenseQuery();

  return (
    <div className={`bg-white p-4 overflow-y-scroll ${className}`}>
      <ul>
        {Post.map(post => (
          <li key={post.id} className='border-b py-2'>
            {post.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
