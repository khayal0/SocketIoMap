import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import GeoLocation from "./GeoLocation";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
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
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  };
  return (
    <div>
      {/* It's <time dateTime={response}>{response}</time>
      <button onClick={handleDisconnect}>GO OFFLINE</button>
      <button onClick={handleConnect}>GO ONLINE</button> */}
      <GeoLocation />
    </div>
  );
}

export default App;
