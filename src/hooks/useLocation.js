import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      setHasLocation(location);
    })();
  }, []);

  return hasLocation;
};

export default useLocation;
