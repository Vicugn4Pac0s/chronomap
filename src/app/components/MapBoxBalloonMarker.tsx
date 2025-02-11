import { Marker } from "react-map-gl";

interface MapBoxMarkerProps {
  id: number;
  text: string;
  image: string;
  latitude: number;
  longitude: number;
  onClick?: () => void;
}

const MapBoxBalloonMarker = ({ id, text, image, latitude, longitude, onClick }: MapBoxMarkerProps) => {
  return (
    <Marker key={id} latitude={latitude} longitude={longitude}>
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-white rounded-full shadow-lg py-1 pl-2 pr-4 flex items-center justify-center gap-2">
          {image && (
            <span className="rounded-full overflow-hidden inline-block h-8 w-8">
              <img src={image} alt="" className="h-full w-full" />
            </span>
            )}
          {(text !== '') ? (
            <span>{text}</span>
          ) : (
            <span className="text-gray-400">ここに入力テキスト</span>
          )}
        </div>
      </div>
    </Marker>
  );
};

export default MapBoxBalloonMarker;