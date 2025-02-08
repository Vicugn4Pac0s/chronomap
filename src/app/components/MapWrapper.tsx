'use client';

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useMap } from "react-map-gl";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import DrawerWrapper from "./DrawerWrapper";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useFormStore } from "../stores/formStore";
import { useMapStore } from "../stores/mapStore";
import MapBoxBalloonMarker from "./MapBoxBalloonMarker";
import useGeolocation from "../hooks/useGeolocation";
import { LngLat } from "mapbox-gl";
import Clock from "./Clock";

const MapWrapper = () => {
  const map = useMap();
  const { data: session } = useSession();
  const [Post] = api.post.get.useSuspenseQuery();
  const [open, setOpen] = useState(false);
  const { selectedLatLng, setSelectedLatLng } = useMapStore();
  const form = useFormStore(state=>state.form);
  const { position } = useGeolocation();

  useEffect(() => {
    if (position) {
      map.default?.flyTo({
        center: new LngLat(position.coords.longitude, position.coords.latitude),
        zoom: 11,
      });
    }
  }, [position]);

  useEffect(() => {
    if (open) {
      const lngLat = map.default?.getCenter();
      if (lngLat) setSelectedLatLng(lngLat);
    }
  }, [open]);

  return (
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
      <Clock className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10" />
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
          {(open && selectedLatLng) && (
            <MapBoxBalloonMarker
              id={-9999}
              text={form.name}
              latitude={selectedLatLng.lat}
              longitude={selectedLatLng.lng}
            />
          )}
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
  );
}

export default MapWrapper;