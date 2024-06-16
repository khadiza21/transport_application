// lpCZ19ggOr5Sbk68OjyDniOrEK8s_AZfS2NGCuiNEiU

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import ChooseCar from '../ChooseCar';
import DashboardNav from '../../../Shared/Navbar/NavDashBoard';

const CarPrime = () => {

    const [pickupLocation, setPickupLocation] = useState('');
    const [latitude, setLatitude] = useState(23.8041);
    const [longitude, setLongitude] = useState(90.4152);
    const [longlang, setLonglang] = useState([0, 0]);
    const [error, setError] = useState('');
    const [move, setMove] = useState(false);
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(0.00);
    const [destination, setDestination] = useState('');
    const [fetchingLocation, setFetchingLocation] = useState(false);


    const position = [latitude, longitude];
    const position1 = longlang;

 
    const handlePickupLocationChange = (e) => {
        setPickupLocation(e.target.value);
    };

    const handleDestinationChange = (e) => {
        const destVlaue = e.target.value;
        setDestination(destVlaue);

    };

    const handleCurrentLocationClick = () => {
        setFetchingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const API_KEY = 'lpCZ19ggOr5Sbk68OjyDniOrEK8s_AZfS2NGCuiNEiU';

                    fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${API_KEY}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.items && data.items.length > 0) {
                                const address = data.items[0].address.label;
                                const currentLocation = {
                                    latitude: latitude,
                                    longitude: longitude,
                                    address: address
                                };
                                setPickupLocation(address);
                                setLatitude(latitude);
                                setLongitude(longitude);
                            } else {
                                console.error('No address found for the given coordinates.');
                                setPickupLocation('');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching address:', error);
                            alert('Error fetching address. Please try again.');
                        })
                        .finally(() => {
                            setFetchingLocation(false);
                        });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                    alert('Error getting current location. Please try again.');
                    setFetchingLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
            setFetchingLocation(false);
        }

    }

  

        const fetchDestinationCoordinates = async (destination) => {
            const API_KEY = 'lpCZ19ggOr5Sbk68OjyDniOrEK8s_AZfS2NGCuiNEiU';
            const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(destination)}&apiKey=${API_KEY}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                return {
                    latitude: data.items[0].position.lat,
                    longitude: data.items[0].position.lng,
                };
            } else {
                throw new Error('No coordinates found for the given destination.');
            }
        }



        const calculateDistance = (pos1, pos2) => {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            const R = 6371; // Radius of the Earth in kilometers
            const dLat = toRadians(pos2[0] - pos1[0]);
            const dLon = toRadians(pos2[1] - pos1[1]);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(pos1[0])) * Math.cos(toRadians(pos2[0])) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };
    

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!pickupLocation || !destination) {
                setError('Please fill out both pickup location and destination');
                return;
            }
            setError('');
    
            try {
                const destinationCoords = await fetchDestinationCoordinates(destination);
                setLonglang([destinationCoords.latitude, destinationCoords.longitude]);
                const dist = calculateDistance(position, [destinationCoords.latitude, destinationCoords.longitude]);
                setDistance(dist);
                setMove(true);
            } catch (error) {
                console.error('Error calculating distance:', error);
                alert('Error calculating distance. Please try again.');
            }
        };


     useEffect(() => {
            if (longlang[0] !== 0 && longlang[1] !== 0) {
                const fetchRoute = async () => {
                    const apiKey = '5b3ce3597851110001cf6248aceb145e309b47fab24beefd6be8f116';
                    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${position[1]},${position[0]}&end=${longlang[1]},${longlang[0]}`;
    
                    try {
                        const response = await axios.get(url);
                        const routeCoordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                        setRoute(routeCoordinates);
                    } catch (error) {
                        console.error("Error fetching the route:", error);
                    }
                };
    
                fetchRoute();
            }
        }, [longlang, position]);



    return (
        <>
            <DashboardNav></DashboardNav>
            <div className="px-24 mx-auto ">
                <div className="card lg:card-side w-fullrounded-lg">
                    
                    
                    
                    <div className='rounded-lg w-4/12 h-[80vh]'>
                        <section className=' rounded-lg p-5' >
                            <MapContainer center={position} zoom={7} style={{ height: '500px', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                
                                />
                                <Marker position={position}>
                                    <Popup>
                                        Staring Point
                                    </Popup>
                                </Marker>
                                <Marker position={position1}>
                                    <Popup>
                                        Ending point
                                    </Popup>
                                </Marker>
                           
                               
                                {route.length > 0 && <Polyline positions={route} color="blue" />}
                               
                            </MapContainer>
                        </section>
                        <section className='px-8 py-4  shadow-lg '>
                            <h1 className="text-3xl font-semibold text-center mb-6">Request a ride for now or later</h1>
                            <small>The distance between the two points is {distance.toFixed(2)} kilometers.</small>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 relative">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupLocation">Pickup Location:</label>
                                    <input id="pickupLocation" type="text" name="pickupLocation" value={pickupLocation} onChange={handlePickupLocationChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCurrentLocationClick}>
                                        {fetchingLocation ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle  className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path>
                                            </svg>
                                        ) : (
                                            <svg id='locationIcon'  className="h-6 w-6 text-gray-600 mt-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M19 8a7 7 0 00-7-7 7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13z" />
                                                <circle cx="12" cy="8" r="2" />
                                            </svg>
                                        )}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">Destination:</label>
                                    <input id="destination" type="text" name="destination" value={destination} onChange={handleDestinationChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    {error && <p className=" text-red-400">{error}</p>}
                                </div>
                                <div className="flex justify-center">
                                    <button id='reqRide' type="submit" className="btn btn-neutral w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Request Ride</button>
                                </div>
                            </form>
                        </section>
                    </div>

                    <div className="card-body w-8/12   ">
                     
                        {move ? 
                        
                        
                        <ChooseCar pickupLocation={pickupLocation} destination={destination} distance={distance}
                        ></ChooseCar> 
                        
                        
                        
                        : null}
                    </div>

                </div>
            </div></>
    );
};

export default CarPrime;

