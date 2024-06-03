import NavDashBoard from "../../../Shared/Navbar/NavDashBoard";
import SharedSection from "../SharedSection";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import { FaSearch } from "react-icons/fa";

const FemaleBus = () => {
    const { register, handleSubmit, reset } = useForm();
    const [upazilaData, setUpazilaData] = useState(null);
    const [selectedFromUpazila, setSelectedFromUpazila] = useState('');
    const [fromBusStopStation, setFromBusStopStation] = useState([]);
    const [selectedToUpazila, setSelectedToUpazila] = useState('');
    const [toBusStopStation, setToBusStopStation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        fetch('upazilaData.json')
            .then(res => {

                return res.json();
            })
            .then(data => {
                setUpazilaData(data);
                setLoading(false);
            })

    }, []);


    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString());
    }, []);

    const handleFromUpazilaChange = (event) => {
        const selectedUpazilaName = event.target.value;
        setSelectedFromUpazila(selectedUpazilaName);
        const selectedUpazilaObj = upazilaData.upazilas.find(upazila => upazila.name === selectedUpazilaName);
        setFromBusStopStation(selectedUpazilaObj ? selectedUpazilaObj.busStop : []);
    };

    const handleToUpazilaChange = (event) => {
        const selectedUpazilaName = event.target.value;
        setSelectedToUpazila(selectedUpazilaName);
        const selectedUpazilaObj = upazilaData.upazilas.find(upazila => upazila.name === selectedUpazilaName);
        setToBusStopStation(selectedUpazilaObj ? selectedUpazilaObj.busStop : []);
    };


    const onSubmit = (data) => {
        console.log(data, currentDate);
    };



    return (
        <div>
            <NavDashBoard></NavDashBoard>

            <div className="px-44 mx-auto my-14">

                <section>





                    <form
                        className="flex flex-col w-3/4 mx-auto mt-8 bg-white p-6 shadow rounded"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {loading ? (
                            <Loading></Loading>
                        ) : (
                            <>
                                <div>

                                    <h1 className=" font-bold">Today Date: </h1>
                                    <input
                                        id="currentDate"
                                        type="text"
                                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                        value={currentDate}
                                        readOnly
                                    />
                                </div>
                                <select
                                    name="timeSlot"
                                    required
                                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                    {...register("timeSlot", { required: true })}
                                >
                                    <option value="" disabled>Select Time Slot</option>
                                    {upazilaData && upazilaData.schedule.map((timeSlot, index) => (
                                        <option key={index} value={timeSlot}>{timeSlot}</option>
                                    ))}
                                </select>
                                <div className="">
                                    <h1 className="mb-1 font-bold">From: </h1>
                                    <div className="grid grid-cols-2 gap-4 ">
                                        <select
                                            required
                                            name="fromUpazilaName"
                                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                            {...register("fromUpazilaName", { required: true })}
                                            value={selectedFromUpazila}
                                            onChange={handleFromUpazilaChange}
                                        >
                                            <option value="" disabled>Select an upazila</option>
                                            {upazilaData && upazilaData.upazilas.map((upazila, index) => (
                                                <option key={index} value={upazila.name}>{upazila.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            required
                                            name="fromBusStopStation"
                                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                            {...register("fromBusStopStation", { required: true })}
                                            // value={fromBusStopStation}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Bus Stop</option>
                                            {fromBusStopStation.map((busStop, index) => (
                                                <option key={index} value={busStop}>{busStop}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>




                                <div className="">
                                    <h1 className="mb-1 font-bold">To: </h1>
                                    <div className="grid grid-cols-2 gap-4 ">
                                        <select
                                            required
                                            name="toUpazilaName"
                                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                            {...register("toUpazilaName", { required: true })}
                                            value={selectedToUpazila}
                                            onChange={handleToUpazilaChange}
                                        >
                                            <option value="" disabled>Select an upazila</option>
                                            {upazilaData && upazilaData.upazilas.map((upazila, index) => (
                                                <option key={index} value={upazila.name}>{upazila.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            required
                                            name="toBusStopStation"
                                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                            {...register("toBusStopStation", { required: true })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select Bus Stop</option>
                                            {toBusStopStation.map((busStop, index) => (
                                                <option key={index} value={busStop}>{busStop}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="flex font-bold btn btn-success p-0 ">


                            <     FaSearch className="font-bold" />
                            <input
                                className=" h-full w-10/12 font-bold"
                                type="submit"
                                value="Serch Buses"
                            ></input>
                        </div>

                    </form>
                </section>



                <SharedSection></SharedSection>
            </div>



        </div>
    );
};

export default FemaleBus;
