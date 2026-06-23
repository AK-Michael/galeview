import { useEffect, useRef } from "react";

const useGeolocation = (onSuccess, onError) => {
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => onSuccessRef.current(pos),
        (err) => {
          console.error(err);
          onErrorRef.current("Location permission denied.");
        }
      );
    } else {
      onErrorRef.current("Geolocation not supported.");
    }
  }, []);
};

export default useGeolocation;
