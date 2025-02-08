import { api } from "~/trpc/react";
import PostItem from "./PostItem";

interface PostListProps {
  className?: string;
}

const PostList = ({ className }: PostListProps) => {
  const [Post] = api.post.get.useSuspenseQuery();

  return (
    <div className={`bg-white p-4 overflow-y-scroll ${className}`}>
      <ul>
        {Post.map(post => (
          <li key={post.id} className='border-b py-2'>
            <PostItem post={post}  />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
