import dayjs from "dayjs";
import { Post } from "../type";

interface PostItemProps {
  post: Post;
  onClick?: () => void;
}

const PostItem = ({ post, onClick }: PostItemProps) => {
  return (
    <article onClick={onClick}>
      {post.name}
      <p className="text-xs">{post.user.name}</p>   
      <p className="text-xs">{dayjs(post.createdAt).format('YYYY/MM/DD HH:mm:ss') }</p>   
    </article>
  );
}

export default PostItem;