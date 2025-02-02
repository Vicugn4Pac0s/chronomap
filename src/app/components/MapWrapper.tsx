'use client';

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { MapProvider } from "react-map-gl";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import DrawerWrapper from "./DrawerWrapper";
import PostForm from "./PostForm";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

const MapWrapper = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [Post] = api.post.get.useSuspenseQuery();
  
  return (
    <MapProvider>
      <div className="relative h-[100vh]">
        {session?.user && (
          <>
            <div className="absolute top-0 right-0 p-2 z-50 w-full">
              <div className="flex justify-between align-middle">
                <Avatar>
                  <AvatarImage src={session.user.image || ''} />
                </Avatar>
                <Button onClick={()=>{setOpen(true)}}>POST</Button>
              </div>
            </div>
            <DrawerWrapper open={open} setOpen={setOpen}>
              <PostForm onComplete={()=>{
                setOpen(false);
              }} />
            </DrawerWrapper>
          </>
        )}
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
    </MapProvider>
  );
}

export default MapWrapper;