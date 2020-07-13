import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import GeoLocation from "./GeoLocation";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [random, setRandom] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    handleConnect();
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

    setInterval(() => socket.emit("random-front", Math.random()), 2000);

    //TODO: use below in control panel not here
    socket.on("random-back", (data) => {
      console.log("data is back to Front", data);
      setRandom(data);
    });
  };

  return (
    <>
      <span>{random}</span>
      <button onClick={handleDisconnect}>GO OFFLINE</button>
      <button onClick={handleConnect}>GO ONLINE</button>
      <GeoLocation watchPosition={true} />
    </>
  );
}

export default App;
