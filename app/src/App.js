import React, { useState, useEffect } from "react";

import GeoLocation from "./GeoLocation";

function App() {
  return (
    <div>
      {/* It's <time dateTime={response}>{response}</time>
      <button onClick={handleDisconnect}>GO OFFLINE</button>
      <button onClick={handleConnect}>GO ONLINE</button> */}
      <GeoLocation watchPosition={true} />
    </div>
  );
}

export default App;
