import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapShow = ({ location1 }) => {
    const position = [location1.latitude, location1.longitude];


    return (
        <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

        </MapContainer>

    )
};

export default MapShow;