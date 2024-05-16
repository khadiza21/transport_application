// lpCZ19ggOr5Sbk68OjyDniOrEK8s_AZfS2NGCuiNEiU

import { useState } from 'react';
import MapShow from '../../../../hooks/MapShow';
import ChooseCar from '../ChooseCar';

const CarPrime = () => {

    const [pickupLocation, setPickupLocation] = useState('');
    const [latitude, setLatitude] = useState(23.8041);
    const [longitude, setLongitude] = useState(90.4152);
    const [error, setError] = useState('');
    const [move, setMove] = useState(false);
    const [destination, setDestination] = useState('');
    const [fetchingLocation, setFetchingLocation] = useState(false);

    console.log(pickupLocation);
    const handlePickupLocationChange = (e) => {
        setPickupLocation(e.target.value[0]);
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

    const location1 = {
        latitude: latitude,
        longitude: longitude,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pickupLocation || !destination) {

            setError('Please fill out both pickup location and destination');

            return;
        }
        setError('');

        setMove(true)
    };

    return (
        <div className="px-24 mx-auto ">
            <div className="card lg:card-side bg-base-100 shadow-xl rounded-lg">
                <div className='rounded-lg w-1/3'>
                    <section className='bg-slate-100' >
                        <MapShow location1={location1}  ></MapShow>
                    </section>
                    <section className='p-12 bg-slate-200 '>
                        <h1 className="text-3xl font-semibold text-center mb-6">Request a ride for now or later</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupLocation">Pickup Location:</label>
                                <input id="pickupLocation" type="text" name="pickupLocation" value={pickupLocation} onChange={handlePickupLocationChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCurrentLocationClick}>
                                    {fetchingLocation ? (
                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5"></path>
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 text-gray-600 mt-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Request Ride</button>
                            </div>
                        </form>
                    </section>
                </div>
                <div className="card-body w-1/2   ">
                    {move ? <ChooseCar></ChooseCar> : null}
                </div>
                <div className="card-body bg-pink-100 w-1/3">
                  
                </div>
            </div>
        </div>
    );
};

export default CarPrime;

