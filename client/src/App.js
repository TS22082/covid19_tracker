import axios from "axios";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";

import AffectedArea from "./components/AffectedArea/AffectedArea";
import secret from "./secret";

import "./App.css";

function App() {
  const [location, setlocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    axios.get("/api/confirmed").then(res => {
      console.log(res);
      navigator.geolocation.getCurrentPosition(function(position) {
        setlocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    });
  }, []);
  return (
    <div className="App">
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: secret.GOOGLE_KEY }}
          defaultCenter={{ lat: 26.8206, lng: 17.2283 }}
          center={location}
          defaultZoom={1}
        >
          <AffectedArea lat={59.955413} lng={30.337844} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
