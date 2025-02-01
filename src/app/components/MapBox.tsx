"use client";

import { useState } from "react";
import Map, { ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapBoxProps {
  options: ViewState;
  children?: React.ReactNode;
}

export default function MapBox({ options, children }: MapBoxProps) {
  const [viewport, setViewport] = useState(options);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        maxZoom={10}
        minZoom={7}
      >
        {children}
      </Map>
    </div>
  );
}