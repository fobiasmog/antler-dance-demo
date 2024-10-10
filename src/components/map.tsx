// @ts-nocheck

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapComponent({ onSelect, markers }) {
    // Custom marker icon
    const customIcon = (src: String) => new L.Icon({
        iconUrl: src, // Replace with your marker icon URL
        iconSize: [80, 80],
        iconAnchor: [12, 41],
        popupAnchor: [0, 0],
        // popupAnchor: [1, -34],
        // shadowUrl: src, // Replace with your marker shadow URL
        // shadowSize: [41, 41],
        className: 'leaflet-custom-icon rounded-full'
    });

    const position = [51.51, -0.08]; // Center position of the map

    return (
        <MapContainer center={position} zoom={15} zoomControl={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="monochrome-map"
        />
        {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={customIcon(marker.image)}
                eventHandlers={{
                    click: (e) => {
                        // e.target.getElement().classList.add('border-2', 'border-orange-500')
                        onSelect(index, e.target.getElement())
                    },
                    popupclose: (e) => {
                        onSelect(null, e.target.getElement())
                    }
                }}>
                <Popup className='opacity-0'>{marker.popupText}</Popup>
            </Marker>
        ))}
        </MapContainer>
    );
}
