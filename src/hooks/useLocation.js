import { useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  useEffect(() => {
    (() => {
      Location.installWebGeolocationPolyfill();
    })();
  }, []);
};

export default useLocation;
