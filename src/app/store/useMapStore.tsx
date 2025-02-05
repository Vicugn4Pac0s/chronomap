import { LngLat } from "mapbox-gl";
import { create } from "zustand";

interface MapState {
  selectedLatLng: LngLat | null;
  setSelectedLatLng: (latLng: LngLat) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedLatLng: null,
  setSelectedLatLng: (latLng) => set({ selectedLatLng: latLng }),
}));