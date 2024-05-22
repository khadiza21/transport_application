
import { useForm } from 'react-hook-form';
import busdriverdata from '../../hooks/busdriverdata';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../Shared/Loading/Loading';
const BusVehicleProfile = () => {

    const { register, handleSubmit, reset, setValue } = useForm();
    const [driverData] = busdriverdata();
    const [loading, setLoading] = useState(true);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [stops, setStops] = useState([]);

    const busData = {
        areaCodes: ['DHA', 'CTG', 'RAJ', 'SYL', 'MY', 'NG', 'NR', 'NA', 'ND', 'NT', 'NK', 'NO', 'PB', 'PA', 'PT', 'PJ', 'RB', 'RM', 'RP', 'SK', 'SP', 'SH', 'SG'],
        categoryCodes: ['BHA', 'CHA', 'GA', 'GHA', 'KA', 'KHA', 'MA', 'PA', 'THA']
    };


    useEffect(() => {
        fetch('busroute.json')
            .then(res => {

                return res.json();
            })
            .then(data => {
                setRoutes(data);
                setLoading(false);
            })

    }, []);

 
    useEffect(() => {
        const route = routes.find(r => r.route_number === Number(selectedRoute));
        if (route) {
            setStops(route.stops);
            setValue('stops', route.stops.join(', '));
            

        }
    }, [selectedRoute, setValue]);


    const onSubmit =  (data) => {
        console.log(data)
       
    };

    if (loading) return <Loading></Loading>;



    return (
        <div class="container mx-auto my-5 py-5 shadow-lg rounded-lg ">
            <h2 className="text-4xl font-bold mb-4 text-center">Bus Profile Form</h2>
            <form
                className="flex flex-col w-3/4 mx-auto mt-8 bg-white overflow-hidden "
            onSubmit={handleSubmit(onSubmit)}
            >



                <input
                    name="email"
                    defaultValue={driverData?.email}
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    placeholder="Email"
                    {...register("email")}
                    readOnly
                />
                <input
                    name="name"
                    defaultValue={driverData?.name
                    }
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    {...register("name")}
                    placeholder="Name"
                    readOnly
                />

                <input
                    name="phone"
                    defaultValue={driverData?.phone
                    }
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    {...register("phone")}
                    placeholder="Phone"
                    readOnly
                />
                <input
                    name="role"
                    value={driverData?.role}
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    {...register("role")}
                    placeholder="Role "
                    readOnly
                />


                {driverData?.role === 'femalebus' ? (
                    <input
                        value="Female Bus"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("servicerole")}
                        placeholder="Service Role"
                        readOnly
                    />
                ) : driverData?.role === 'publicbus' ? (
                    <input
                        value="Public Bus"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("servicerole")}
                        placeholder="Service Role"
                        readOnly
                    />
                ) : null}


                <select
                    name="route_number"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("route_number")}
                    onChange={(e) => setSelectedRoute(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Select Route Number</option>

                    {routes.map((route, index) => (<option
                        value={route.route_number} key={index}
                    >{route.route_number}</option>))}

                </select>





                <textarea rows="6"
                    name="stops"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("stops")}
                    value={stops.join('--> ')}
                    placeholder='Route & Bus Stop'
                    readOnly
                />
                <input
                    placeholder='First Stop'
                    name="firststops"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("firststops")}
                    value={stops[0]}
                    readOnly
                />
                {console.log()}
                <input
                    placeholder='Last Stop'
                    name="laststops"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("laststops")}
                    value={stops[stops.length-1]}
                    readOnly
                />




                <div>
                    <h1 className='mt-1 mb-2 text-xl'>Seating Capacity</h1>
                    <input
                        type='number'
                        name="seatingcapacity"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("seatingcapacity")}
                        value={40}
                    />
                </div>






                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("year", { required: true })}
                />



                <input
                    type="text"
                    name="licensePlate"
                    placeholder="LIcensePlate"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("licensePlate", { required: true })}
                />



                <div className="lg:flex lg:justify-between ">

                    <select
                        name="areaCode"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("areaCode", { required: true })}
                    >
                        <option value="">Select Area Code</option>
                        {busData.areaCodes.map((code, index) => (
                            <option key={index} value={code}>{code}</option>
                        ))}
                    </select>




                    <select
                        name="categoryCode"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("categoryCode", { required: true })}
                    >
                        <option value="">Select Category Code</option>
                        {busData.categoryCodes.map((code, index) => (
                            <option key={index} value={code}>{code}</option>
                        ))}
                    </select>

                    <input
                        placeholder="number"
                        type="text"
                        name="number"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("number", { required: true })}
                    />
                </div>


                <div>
                    <h1 className='mt-1 mb-2 text-xl'>Charge Per Km </h1>
                    <input
                        type="number"
                        name="chargePerKm"
                        placeholder="Charge Per KM"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("chargePerKm", { required: true })}
                        value={1.5}
                    />
                </div>





                <input
                    class="btn btn-success py-2 px-4 font-bold"
                    type="submit"
                    value="Save"
                />
            </form>
            <Link to='/'>   <button className="btn bg-slate-500 flex flex-col w-3/4 mx-auto mb-10 mt-4 bg-white shadow-lg rounded-lg overflow-hidden p-6 font-bold">GO Back </button></Link>

        </div>
    );

};

export default BusVehicleProfile;