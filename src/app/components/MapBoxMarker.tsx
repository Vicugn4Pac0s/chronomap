import { Marker } from "react-map-gl";
import { FaCoffee } from "react-icons/fa"; // コーヒーカップアイコン

interface MapBoxMarkerProps {
  id: string;
  latitude: number;
  longitude: number;
  onClick: () => void;
}

const MapBoxMarker = ({ id, latitude, longitude, onClick }: MapBoxMarkerProps) => {
  return (
    <Marker key={id} latitude={latitude} longitude={longitude} onClick={() => onClick()}>
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="bg-[#6f4e37] text-white p-2 rounded-full shadow-lg">
          <FaCoffee size={20} />
        </div>
      </div>
    </Marker>
  );
};

export default MapBoxMarker;