import {useState, useEffect} from 'react';
import {Marker, Popup} from 'react-leaflet';
import L from "leaflet";
import marker from "../../ui/rest.png";

const AsyncMarker = ({restaurant}) => {
    const [coordinates, setCoordinates] = useState(null);
    const geocodeAddress = async (address) => {
        try {
            const encodedAddress = encodeURIComponent(address);
            const nominatimURL = `https://nominatim.openstreetmap.org/search?addressDetails=1&q=${encodedAddress}&format=json&limit=1`;
            const response = await fetch(nominatimURL);

            if (!response.ok) {
                throw new Error('Geocoding failed');
            }

            const data = await response.json();

            if (data.length > 0) {
                const location = data[0];
                return [location.lat, location.lon];
            } else {
                throw new Error('No results found');
            }
        } catch (error) {
            console.error('Error geocoding address:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchCoordinates = async () => {
            const address = `${restaurant.restaurant.address.city}, ${restaurant.restaurant.address.street}`;
            const result = await geocodeAddress(address);

            if (result) {
                setCoordinates(result);
            }
        };

        fetchCoordinates();
    }, [restaurant]);

    if (!coordinates) {
        return null;
    }
    const defaultMarkerIcon = new L.Icon({
        iconUrl: marker, // Dodaj ścieżkę do pliku ikony
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    return (
        <Marker position={coordinates} icon={defaultMarkerIcon}>
            <Popup>
                <b>{restaurant.restaurant.name}</b>
                <p>{`${restaurant.restaurant.address.city}, ${restaurant.restaurant.address.street}, ${restaurant.restaurant.address.postalCode}`}</p>
            </Popup>
        </Marker>
    );
};

export default AsyncMarker;