'use client';

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { MapProvider } from "react-map-gl";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import DrawerWrapper from "./DrawerWrapper";
import PostForm from "./PostForm";
import { useState } from "react";

const MapWrapper = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [Post] = api.post.get.useSuspenseQuery();
  
  return (
    <MapProvider>
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
          >
            {Post.map((post) => (
              <MapBoxMarker
                id={post.id}
                image={post.user.image}
                latitude={post.latitude}
                longitude={post.longitude}
            />
            ))}
        </MapBox>
      </div>
      {session?.user && (
        <>
          <button onClick={()=>{
            setOpen(true);
          }}>登録</button>
          <DrawerWrapper open={open} setOpen={setOpen}>
            <PostForm onComplete={()=>{
              setOpen(false);
            }} />
          </DrawerWrapper>
        </>
      )}
    </MapProvider>
  );
}

export default MapWrapper;