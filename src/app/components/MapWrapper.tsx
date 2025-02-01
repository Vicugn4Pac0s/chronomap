'use client';

import { api } from "~/trpc/react";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import { PostForm } from "./PostForm";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LngLat } from "mapbox-gl";

const MapWrapper = () => {
  const { data: session } = useSession();
  const [Post] = api.post.get.useSuspenseQuery();
  const [lnglat, setLngLat] = useState<LngLat | null>(null);
    
  return (
    <>
      <div className="relative h-[50vh]">
        <MapBox
          options={{
            latitude: 35.6895,
            longitude: 139.6917,
            zoom: 11,
            bearing: 0,
            pitch: 0,
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
          }}
          onClick={(e) => setLngLat(e.lngLat)}
          >
            {Post.map((post) => (
              <MapBoxMarker
                id={post.id}
                latitude={post.latitude}
                longitude={post.longitude}
            />
            ))}
        </MapBox>
      </div>
      {session?.user && <PostForm lnglat={lnglat} />}
    </>
  );
}

export default MapWrapper;