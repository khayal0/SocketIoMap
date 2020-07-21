import React, { useLayoutEffect, useEffect, useState } from "react";

import "./index.scss";
import { CarIcon } from "./icons";

//TODO: Multiple map types
const HereMaps = ({ latitude, longitude }) => {
  // console.log("latitude", latitude);
  // console.log("longitude", longitude);
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [marker, setMarker] = useState(null);
  const [hMap, setHMap] = useState(null);

  useEffect(() => {
    setLng(longitude);
    setLat(latitude);
    console.log(lng, lat);
  }, [longitude, latitude]);

  useEffect(() => {
    console.log("/", marker);
    if (marker) {
      marker.setGeometry({ lat: latitude, lng: longitude });
      hMap.setCenter({ lat: latitude, lng: longitude });
    }
  }, [marker, lng]);

  const handleSetGeometry = (marker, hMap) => {
    // marker.setGeometry({ lat: 10, lng: 10 });
    // hMap.setCenter({ lat: 10, lng: 10 });
    console.log("this is mareker", marker);
    setMarker(marker);
    setHMap(hMap);
  };
  useLayoutEffect(() => {
    if (!mapRef.current) return;
    // @ts-ignore
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "oZkMqrUPiTShk-rHk2xoobxW9tIf1h-UbFpYgWQ228M",
    });
    const defaultLayers = platform.createDefaultLayers();
    const layers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, layers.raster.normal.transit, {
      center: { lat, lng },
      zoom: 12,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const icon = new H.map.Icon(CarIcon);
    const coords = { lat, lng };
    const marker = new H.map.Marker(coords, { icon: icon });

    // marker.setGeometry({ lat, lng });
    handleSetGeometry(marker, hMap);

    hMap.addObject(marker);
    // hMap.setCenter(coords);

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return (
    <>
      <div className="map" ref={mapRef} />
      <span>{lng}</span>
      <span>{lat}</span>
    </>
  );
};

export default HereMaps;
