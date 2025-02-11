'use client';

import { api } from "~/trpc/react";
import { useMap } from "react-map-gl";
import MapBox from "./MapBox";
import MapBoxMarker from "./MapBoxMarker";
import { useEffect } from "react";
import { useFormStore } from "../stores/formStore";
import { useMapStore } from "../stores/mapStore";
import MapBoxBalloonMarker from "./MapBoxBalloonMarker";
import useGeolocation from "../hooks/useGeolocation";
import { LngLat } from "mapbox-gl";
import { useDrawerStore } from "../stores/drawerStore";


const MapWrapper = () => {
  const map = useMap();
  const { position } = useGeolocation();
  const [Post] = api.post.get.useSuspenseQuery();
  const isOpen = useDrawerStore(state=>state.isOpen);
  const { selectedLatLng, setSelectedLatLng } = useMapStore();
  const form = useFormStore(state=>state.form);

  useEffect(() => {
    if (position) {
      map.default?.flyTo({
        center: new LngLat(position.coords.longitude, position.coords.latitude),
        zoom: 16,
      });
    }
  }, [position]);

  useEffect(() => {
    if (isOpen) {
      const lngLat = map.default?.getCenter();
      if (lngLat) setSelectedLatLng(lngLat);
    }
  }, [isOpen]);

  return (
    <MapBox
      options={{
        latitude: 35.6895,
        longitude: 139.6917,
        zoom: 16,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      }}
      >
        {(isOpen && selectedLatLng) && (
          <MapBoxBalloonMarker
            id={-9999}
            text={form.name}
            image={''}
            latitude={selectedLatLng.lat}
            longitude={selectedLatLng.lng}
          />
        )}
        {Post.map((post) => (
          post.name && (
            <MapBoxBalloonMarker
              key={post.id}
              id={post.id}
              text={post.name}
              image={post.user.image || ''}
              latitude={post.latitude}
              longitude={post.longitude}
              onClick={() => {
                map.default?.flyTo({
                  center: new LngLat(post.longitude, post.latitude),
                  zoom: 17,
                });
              }}
            />
          )
        ))}
    </MapBox>
  );
}

export default MapWrapper;