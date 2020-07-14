import React, { useLayoutEffect, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import "./index.scss";
import { CarIcon } from "./icons";
const ENDPOINT = "http://127.0.0.1:4001";

//TODO: Multiple map types
const HereMaps = ({ latitude, longitude }) => {
  // console.log("latitude", latitude);
  // console.log("longitude", longitude);
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);

  useEffect(() => {
    setLng(longitude);
    setLat(latitude);
    console.log(lng, lat);
  }, [longitude, latitude]);

  useEffect(() => {
    const coordinates = { longitude: lng, latitude: lat };
    const socket = socketIOClient(ENDPOINT);
    handleConnect();

    setInterval(() => socket.emit("locationFront", coordinates), 1000);
    socket.on("locationApi", (data) => {
      console.log("datafromSocket", data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const handleDisconnect = () => {
    const socket = socketIOClient(ENDPOINT);
    console.log("disconnected");
    socket.disconnect();
  };
  const handleConnect = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.connect();
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

    const icon = new H.map.Icon(CarIcon),
      coords = { lat, lng },
      marker = new H.map.Marker(coords, { icon: icon });

    marker.setGeometry({ lat, lng });
    hMap.setCenter({ lat, lng });

    hMap.addObject(marker);
    hMap.setCenter(coords);

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

  return <div className="map" ref={mapRef} />;
};

export default HereMaps;
