import { Post } from "../type";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {  
  return (
    <article>
      {post.name}
    </article>
  );
}

export default PostItem;