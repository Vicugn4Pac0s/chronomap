import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
        }
      );
    }
  }, []);

  return { position };
};

export default useGeolocation;
