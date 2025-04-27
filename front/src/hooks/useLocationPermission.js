import { useState } from "react";
import { saveScanRecord } from "../api/recordService";

const useLocationPermission = (petId) => {
  const [isLocationRequested, setIsLocationRequested] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const requestLocationPermission = () => {
    if (!petId || isLocationRequested) return;

    if ("geolocation" in navigator) {
      setIsRequestingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          saveScanRecord(petId, latitude, longitude)
            .then(() => {
              setIsLocationRequested(true);
              setIsRequestingLocation(false);
            })
            .catch((err) => {
              setLocationError("Failed to save scan record: " + err.message);
              setIsRequestingLocation(false);
            });
        },
        (error) => {
          setLocationError("Cannot get location. Please allow location access.");
          setIsRequestingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  return { locationError, isRequestingLocation, requestLocationPermission };
};

export default useLocationPermission;