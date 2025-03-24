import { useState, useEffect } from "react";
import { saveScanRecord } from "../api/recordService";

const useLocationPermission = (petId) => {
  const [isLocationRequested, setIsLocationRequested] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!petId || isLocationRequested) return;

    setIsLocationRequested(true);
    requestLocationPermission();
  }, [petId]);

  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          saveScanRecord(petId, latitude, longitude).catch((err) =>
            setLocationError("Failed to save scan record: " + err.message)
          );
        },
        (error) => {
          setLocationError("Cannot get location. Please allow location access.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  return { locationError };
};

export default useLocationPermission;