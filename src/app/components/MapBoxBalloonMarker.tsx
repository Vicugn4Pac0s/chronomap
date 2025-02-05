import { Marker } from "react-map-gl";

interface MapBoxMarkerProps {
  id: number;
  text: string;
  latitude: number;
  longitude: number;
}

const MapBoxBalloonMarker = ({ id, text, latitude, longitude }: MapBoxMarkerProps) => {
  if(text === '') return null;
  return (
    <Marker key={id} latitude={latitude} longitude={longitude}>
      <div
        className="cursor-pointer"
      >
        <div className="bg-white rounded-full shadow-lg p-2">
          { text }
        </div>
      </div>
    </Marker>
  );
};

export default MapBoxBalloonMarker;