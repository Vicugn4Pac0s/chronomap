import { api } from "~/trpc/react";
import PostItem from "./PostItem";
import { useMap } from "react-map-gl";
import { LngLat } from "mapbox-gl";

interface PostListProps {
  className?: string;
}

const PostList = ({ className }: PostListProps) => {
  const [Post] = api.post.get.useSuspenseQuery();
  const map = useMap();

  return (
    <div className={`bg-white p-4 overflow-y-scroll ${className}`}>
      <ul>
        {Post.map(post => (
          <li key={post.id} className='border-b py-2'>
            <PostItem post={post} onClick={() => {
              map.default?.flyTo({
                center: new LngLat(post.longitude, post.latitude),
                zoom: 17,
              });
            }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
