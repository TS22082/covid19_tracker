import React, { useEffect } from "react";
import "./App.css";
import GoogleMapReact from "google-map-react";
import AffectedArea from "./components/AffectedArea/AffectedArea";
import secret from "./secret";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/api/confirmed").then(res => console.log(res));
  }, []);
  return (
    <div className="App">
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: secret.GOOGLE_KEY }}
          defaultCenter={{ lat: 26.8206, lng: 17.2283 }}
          defaultZoom={1}
        >
          <AffectedArea lat={59.955413} lng={30.337844} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
