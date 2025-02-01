import { Marker } from "react-map-gl";
import { FaCoffee } from "react-icons/fa"; // コーヒーカップアイコン

interface MapBoxMarkerProps {
  id: number;
  image: string | null;
  latitude: number;
  longitude: number;
  onClick?: () => void;
}

const MapBoxMarker = ({ id, image, latitude, longitude, onClick }: MapBoxMarkerProps) => {
  return (
    <Marker key={id} latitude={latitude} longitude={longitude} onClick={() => onClick && onClick()}>
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="rounded-full shadow-lg w-10 overflow-hidden">
          {image ? <img src={image} />: <FaCoffee size={20} /> }
        </div>
      </div>
    </Marker>
  );
};

export default MapBoxMarker;