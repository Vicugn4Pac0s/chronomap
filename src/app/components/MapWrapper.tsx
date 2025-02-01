'use client';

import { api } from "~/trpc/react";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";

const MapWrapper = () => {
  const [Post] = api.post.get.useSuspenseQuery();
    
  return (
    <div className="relative h-[50vh]">
      <MapBox options={{
          latitude: 35.6895,
          longitude: 139.6917,
          zoom: 11,
          bearing: 0,
          pitch: 0,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
        }}>
          {Post.map((post) => (
            <MapBoxMarker
              id={post.id}
              latitude={post.latitude}
              longitude={post.longitude}
          />
          ))}
      </MapBox>
    </div>
  );
}

export default MapWrapper;