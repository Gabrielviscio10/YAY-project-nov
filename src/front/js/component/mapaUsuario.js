import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const libraries = ["places", "geometry"];

export const MapaUsuario = ({ setDireccion, initialDireccion }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState(initialDireccion || { lat: 40.1402000, lng: -3.4226700 });
    const [center, setCenter] = useState(initialDireccion || { lat: 40.1402000, lng: -3.4226700 });

    const mapRef = React.useRef();

    useEffect(() => {
        if (initialDireccion) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: initialDireccion }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    const newPosition = {
                        lat: location.lat(),
                        lng: location.lng()
                    };
                    setMarkerPosition(newPosition);
                    setCenter(newPosition);
                    setAddress(initialDireccion); // Establece la dirección en el estado
                } else {
                    console.error("Geocoding failed: " + status);
                }
            });
        }
    }, [initialDireccion]);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const newPosition = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                setMarkerPosition(newPosition);
                setCenter(newPosition);
                setAddress(place.formatted_address);
                setDireccion(place.formatted_address); // Actualiza la dirección aquí
                if (mapRef.current) {
                    google.maps.event.addListenerOnce(mapRef.current, 'idle', () => {
                        mapRef.current.panTo(newPosition);
                    });
                }
            }
        }
    };

    const onMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkerPosition(newPosition);
        setCenter(newPosition); // Actualiza el centro del mapa
        // Aquí puedes usar el servicio de geocodificación para obtener la dirección
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newPosition }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setAddress(results[0].formatted_address); // Actualiza el estado de la dirección
            }
        });
    };

    const mapContainerStyle = {
        height: "400px",
        width: "800px",
        cursor: 'pointer'
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previene el envío del formulario
            onPlaceChanged(); // Llama a tu función para manejar el cambio de lugar
        }
    };


    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBLVJxF33WzBypiNQ9ih1oZKX2TdEnjoeA"
            libraries={libraries}
        >
            <GoogleMap
                ref={mapRef}
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick} // Agrega el manejador aquí
            >
                <Autocomplete
                    onLoad={autocomplete => setAutocomplete(autocomplete)}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Buscar dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={handleKeyPress}
                        style={{
                            position: 'absolute',
                            top: '50px',
                            left: '10px',
                            zIndex: 1,
                            padding: '10px',
                            width: '300px'
                        }}
                    />
                </Autocomplete>
                <Marker position={markerPosition} />
            </GoogleMap>
        </LoadScript>
    );
};