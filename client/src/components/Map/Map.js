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

    const handleApiLoaded = (map, maps) => {
        window.map = map;
        affectedAreas.data.forEach(element => {
            if (element.country_code === 'US') {
                if (element.county) {
                    window.map.data.loadGeoJson(`/api/geojson?county=${element.county}`);
                }
            }
        });
    };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{ lat: 26.8206, lng: 17.2283 }}
        center={location}
        defaultZoom={1}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {
            affectedAreas.data.map((element, index) => {
                return <AffectedArea
                    key={index}
                    lat={element.coordinates.lat}
                    lng={element.coordinates.long}
                    data={{ country: element.country, history: element.history, latest: element.latest }}
                />
        }
        )}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
