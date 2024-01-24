import React, {useEffect, useRef} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import marker from '../ui/rest.png'
import AsyncMarker from "../presentation/summary/AsyncMarker";

const MapComponent = ({restaurants}) => {
    const mapRef = useRef(null);

    return (
        <MapContainer ref={mapRef} center={[51.9189046, 19.1343786]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {restaurants.map((restaurant, index) => (
                <AsyncMarker key={index} restaurant={restaurant} />
            ))}
        </MapContainer>
    );
};

export default MapComponent;