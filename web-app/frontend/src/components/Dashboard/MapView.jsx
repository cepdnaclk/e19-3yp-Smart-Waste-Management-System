import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 7.2538,
  lng: 80.5916,
};

const specificLocation = {
  lat: 7.2538,
  lng: 80.5916,
};

const MapView = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfO-cbObfcLzAwzjpI9qZG-w_aDHmJ5Dk",
    libraries,
  });

  const [showInfo, setShowInfo] = useState(false);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Marker position={specificLocation} onClick={() => setShowInfo(true)} />
        {showInfo && (
          <InfoWindow
            position={specificLocation}
            onCloseClick={() => setShowInfo(false)}
          >
            <div>
              <h3>Bin_001</h3>
              <p>Description: Add your description here</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;
