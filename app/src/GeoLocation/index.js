import React, { useState, useEffect } from "react";

import { geolocated } from "react-geolocated";
import HereMaps from "../HereMaps";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const GeoLocation = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled,
}) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    setLatitude(coords && coords.latitude);
    setLongitude(coords && coords.longitude);
  }, [coords]);

  const handleConnect = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.connect();
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    handleConnect();

    setInterval(
      () => socket.emit("locationFront", { longitude, latitude }),
      1000
    );

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <HereMaps {...{ longitude, latitude }} />
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(GeoLocation);
