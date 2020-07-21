import React, { useState, useEffect } from "react";

import { geolocated } from "react-geolocated";
import HereMaps from "../HereMaps";

const GeoLocation = (props) => {
  return !props.isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : props.coords ? (
    <HereMaps
      latitude={props.coords.latitude}
      longitude={props.coords.longitude}
    />
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
