import { useState } from 'react';

const CarPrime = () => {

    const [rideType, setRideType] = useState('now');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
  
    const handleRideTypeChange = (e) => {
      setRideType(e.target.value);
    };
  
    const handlePickupLocationChange = (e) => {
      setPickupLocation(e.target.value);
    };
  
    const handleDestinationChange = (e) => {
      setDestination(e.target.value);
    };
  
    const handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              // Fetch address using reverse geocoding
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
                .then(response => response.json())
                .then(data => {
                  if (data.results && data.results.length > 0) {
                    const address = data.results[0].formatted_address;
                    setPickupLocation(address);
                  } else {
                    console.error('No address found for the given coordinates.');
                    alert('No address found for the given coordinates.');
                  }
                })
                .catch(error => {
                  console.error('Error fetching address:', error);
                  alert('Error fetching address. Please try again.');
                });
            },
            (error) => {
              console.error('Error getting current location:', error);
              alert('Error getting current location. Please try again.');
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      };
      
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', { rideType, pickupLocation, destination });
    };
  


    return (
        <div className="max-w-lg mx-auto py-8">
            <h1 className="text-3xl font-semibold text-center mb-6">Request a ride for now or later</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupLocation">Pickup Location:</label>
                    <input id="pickupLocation" type="text" name="pickupLocation" value={pickupLocation} onChange={handlePickupLocationChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleCurrentLocationClick}>
                        <svg className="h-6 w-6 text-gray-600 mt-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 8a7 7 0 00-7-7 7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13z" />
                            <circle cx="12" cy="8" r="2" />
                        </svg>
                    </span>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">Destination:</label>
                    <input id="destination" type="text" name="destination" value={destination} onChange={handleDestinationChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Request Ride</button>
                </div>
            </form>
        </div>
    );
};

export default CarPrime;