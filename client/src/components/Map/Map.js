import axios from "axios";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";

import AffectedArea from "../AffectedArea/AffectedArea";

function Map() {
  const [location, setlocation] = useState({});
  const [affectedAreas, setAffectedAreas] = useState({ data: [] });

  useEffect(() => {
    axios.get("/api/confirmed").then(res => {
      setAffectedAreas({ data: res.data });
      navigator.geolocation.getCurrentPosition(function(position) {
        setlocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{ lat: 26.8206, lng: 17.2283 }}
        center={location}
        defaultZoom={1}
      >
        {affectedAreas.data.map((element, index) => (
          <AffectedArea
            key={index}
            lat={element.coordinates.lat}
            lng={element.coordinates.long}
            data={{ country: element.country, history: element.history }}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
