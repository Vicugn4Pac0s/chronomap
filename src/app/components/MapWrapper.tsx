'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/app/components/ui/drawer"

import { api } from "~/trpc/react";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import { PostForm } from "./PostForm";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { LngLat } from "mapbox-gl";
import { set } from "zod";

const MapWrapper = () => {
  const { data: session } = useSession();
  const [Post] = api.post.get.useSuspenseQuery();
  const [open ,setOpen] = useState(false);
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
          onClick={(e) => {
            setLngLat(e.lngLat);
            setOpen(true);
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
        <Drawer open={open} onClose={() => setOpen(false)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <PostForm lnglat={lnglat} />
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default MapWrapper;