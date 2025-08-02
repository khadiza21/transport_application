import NavDashBoard from "../../../Shared/Navbar/NavDashBoard";
import SharedSection from "../SharedSection";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FemaleBus = () => {
    const { register, handleSubmit, reset } = useForm();
    const [upazilaData, setUpazilaData] = useState(null);
    const [selectedFromUpazila, setSelectedFromUpazila] = useState("");
    const [fromBusStopStation, setFromBusStopStation] = useState([]);
    const [selectedToUpazila, setSelectedToUpazila] = useState("");
    const [toBusStopStation, setToBusStopStation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState("");
    const [busData, setBusData] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [fromdata, setFromdata] = useState([]);
    const [seatNumber, setSeatNumber] = useState(0);
    const [distance, setDistance] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);

    useEffect(() => {
        fetch("upazilaData.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUpazilaData(data);
                setLoading(false);
            });
    }, []);

    
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString());
    }, []);

    const handleFromUpazilaChange = (event) => {
        const selectedUpazilaName = event.target.value;
        setSelectedFromUpazila(selectedUpazilaName);
        const selectedUpazilaObj = upazilaData.upazilas.find(
            (upazila) => upazila.name === selectedUpazilaName
        );
        setFromBusStopStation(selectedUpazilaObj ? selectedUpazilaObj.busStop : []);
    };

    const handleToUpazilaChange = (event) => {
        const selectedUpazilaName = event.target.value;
        setSelectedToUpazila(selectedUpazilaName);
        const selectedUpazilaObj = upazilaData.upazilas.find(
            (upazila) => upazila.name === selectedUpazilaName
        );
        setToBusStopStation(selectedUpazilaObj ? selectedUpazilaObj.busStop : []);
    };

    // toUpazilaName,toBusStopStation,fromBusStopStation
    const onSubmit = (data) => {
        console.log(data.fromUpazilaName, currentDate);
        console.log(currentDate);
        setFromdata([data, currentDate]);
        fetch("https://transport-server2-1.onrender.com/busdata")
            .then((res) => res.json())
            .then((busData) => {
                setBusData(busData);

                console.log(busData[0]?.firststops);
                console.log(busData[0]);
                const results = busData.filter((bus) => {
                    const stopsArray = bus.stops.split(", ");

                    const fromIndex = stopsArray.indexOf(data.fromUpazilaName);
                    const toIndex = stopsArray.indexOf(data.toUpazilaName);
                    const fromstopIndex = stopsArray.indexOf(data.fromBusStopStation);
                    const tostopIndex = stopsArray.indexOf(data.toBusStopStation);

                    const fromDistanceIndex =
                        fromIndex !== -1 ? fromIndex : fromstopIndex;
                    const toDistanceIndex = toIndex !== -1 ? toIndex : tostopIndex;
                    const distance = Math.abs(toDistanceIndex - fromDistanceIndex);
                    console.log(`Distance: ${distance}`);
                    console.log(fromIndex, toIndex, fromstopIndex, tostopIndex, distance);
                    setDistance(distance);

                    if (
                        (fromIndex !== -1 || fromstopIndex !== -1) &&
                        (toIndex !== -1 || tostopIndex !== -1) &&
                        (fromIndex < toIndex || fromstopIndex < tostopIndex)
                    ) {
                        if ((fromIndex || fromstopIndex) && (toIndex || tostopIndex)) {
                        }

                        console.log("ppppppppp");

                        return bus.timeSlot === data.timeSlot;
                    }
                    return false;
                });
                setSearchResults(results);
            });
    };

    const handleSeatNumberChange = (event) => {
        setSeatNumber(event.target.value);
    };

    console.log(searchResults, "pppoiiippppppp");

    console.log(fromdata, "pppppppp");

    console.log(selectedBus, "selectbus");

    const handleConfirm = () => {
        const bookingData = {
            bus: selectedBus,
            date: fromdata[1],
            rent: isNaN(seatNumber)
                ? selectedBus?.chargePerKm * distance + 10
                : selectedBus?.chargePerKm * distance * seatNumber + 10,
            availableSeat: isNaN(seatNumber)
                ? 0
                : selectedBus?.seatingcapacity - Number(seatNumber),
            fromUpazila: fromdata[0]?.fromUpazilaName,
            fromBusStop: fromdata[0]?.fromBusStopStation,
            toUpazila: fromdata[0]?.toUpazilaName,
            toBusStop: fromdata[0]?.toBusStopStation,
            timeSlot: fromdata[0]?.timeSlot,
            date: fromdata[1],
            seatNumber: seatNumber,
        };
        console.log(bookingData, "booking data");

        fetch("https://transport-server2-1.onrender.com/busSeatBookingData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then((response) => {
                toast.success(
                    "Booking Confirmed! Your seat has been successfully booked."
                );

                console.log(response);
            });
    };

    return (
        <div>
            <NavDashBoard></NavDashBoard>

            <div className="container px-4 mx-auto my-14">
                <section>
                    <form
                        className="flex flex-col w-full max-w-3xl mx-auto mt-8 bg-white p-4 sm:p-6 shadow rounded"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {loading ? (
                            <Loading />
                        ) : (
                            <>

                                <div className="mb-4">
                                    <h1 className="font-bold">Today Date:</h1>
                                    <input
                                        id="currentDate"
                                        type="text"
                                        className="w-full py-2 px-4 border border-gray-300 rounded mt-1"
                                        value={currentDate}
                                        readOnly
                                    />
                                </div>


                                <div className="mb-4">
                                    <select
                                        name="timeSlot"
                                        required
                                        className="w-full py-2 px-4 border border-gray-300 rounded"
                                        {...register("timeSlot", { required: true })}
                                    >
                                        <option value="" disabled>
                                            Select Time Slot
                                        </option>
                                        {upazilaData &&
                                            upazilaData.schedule.map((timeSlot, index) => (
                                                <option key={index} value={timeSlot}>
                                                    {timeSlot}
                                                </option>
                                            ))}
                                    </select>
                                </div>


                                <div className="mb-4">
                                    <h1 className="mb-1 font-bold">From:</h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <select
                                            required
                                            name="fromUpazilaName"
                                            className="w-full py-2 px-4 border border-gray-300 rounded"
                                            {...register("fromUpazilaName", { required: true })}
                                            value={selectedFromUpazila}
                                            onChange={handleFromUpazilaChange}
                                        >
                                            <option value="" disabled>
                                                Select an upazila
                                            </option>
                                            {upazilaData &&
                                                upazilaData.upazilas.map((upazila, index) => (
                                                    <option key={index} value={upazila.name}>
                                                        {upazila.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <select
                                            required
                                            name="fromBusStopStation"
                                            className="w-full py-2 px-4 border border-gray-300 rounded"
                                            {...register("fromBusStopStation", { required: true })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select Bus Stop
                                            </option>
                                            {fromBusStopStation.map((busStop, index) => (
                                                <option key={index} value={busStop}>
                                                    {busStop}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>


                                <div className="mb-4">
                                    <h1 className="mb-1 font-bold">To:</h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <select
                                            required
                                            name="toUpazilaName"
                                            className="w-full py-2 px-4 border border-gray-300 rounded"
                                            {...register("toUpazilaName", { required: true })}
                                            value={selectedToUpazila}
                                            onChange={handleToUpazilaChange}
                                        >
                                            <option value="" disabled>
                                                Select an upazila
                                            </option>
                                            {upazilaData &&
                                                upazilaData.upazilas.map((upazila, index) => (
                                                    <option key={index} value={upazila.name}>
                                                        {upazila.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <select
                                            required
                                            name="toBusStopStation"
                                            className="w-full py-2 px-4 border border-gray-300 rounded"
                                            {...register("toBusStopStation", { required: true })}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select Bus Stop
                                            </option>
                                            {toBusStopStation.map((busStop, index) => (
                                                <option key={index} value={busStop}>
                                                    {busStop}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}


                        <div className="flex items-center justify-center mt-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 font-bold text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
                            >
                                <FaSearch />
                                Search Buses
                            </button>
                        </div>
                    </form>
                </section>


                {searchResults !== null && (
                    <section className="mt-8 px-4">
                        {searchResults.length > 0 ? (
                            <div>
                                <h2 className="font-bold text-xl mb-6 text-center sm:text-left">Available Buses:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {searchResults.map((bus, index) => (
                                        <div key={index} className="card bg-base-100 shadow-xl">
                                            <div className="card-body">
                                                <h3 className="card-title">Bus Number: {bus.registrationNumber}</h3>
                                                <p>Bus Number: {bus.registrationNumber}</p>

                                                <p>
                                                    From: {fromdata[0]?.fromUpazilaName} - {fromdata[0]?.fromBusStopStation}
                                                </p>
                                                <p>
                                                    To: {fromdata[0]?.toUpazilaName} - {fromdata[0]?.toBusStopStation}
                                                </p>
                                                <p>Time Slot: {bus.timeSlot}</p>

                                              
                                                <div className="mt-3">
                                                    <button
                                                        className="btn text-white bg-yellow-900 w-full"
                                                        onClick={() => {
                                                            setSelectedBus(bus);
                                                            document.getElementById("my_modal_5").showModal();
                                                        }}
                                                    >
                                                        View Details
                                                    </button>

                                                 
                                                    <dialog id="my_modal_5" className="modal">
                                                        <div className="modal-box w-11/12 max-w-2xl">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                                    ✕
                                                                </button>
                                                            </form>
                                                            <h3 className="font-bold text-lg mb-2">Bus Details</h3>
                                                            <h4 className="mb-2">Date: {fromdata[1]}</h4>
                                                            <div className="space-y-2">
                                                                <p className="font-semibold">Bus Name: {bus.name}</p>
                                                                <p>Registration Number: {bus.registrationNumber}</p>
                                                                <p>Contact Number: {bus.phone}</p>
                                                                <p>Route Number: {bus.route_number}</p>
                                                                <p>Stops: {bus.stops}</p>
                                                                <p>Service Role: {bus.servicerole}</p>
                                                                <p>Charge Per Km: {bus.chargePerKm}</p>

                                                                <p>
                                                                    Rent For You:{" "}
                                                                    {isNaN(seatNumber)
                                                                        ? bus.chargePerKm * distance + 10
                                                                        : bus.chargePerKm * distance * seatNumber + 10}
                                                                </p>

                                                                <p>
                                                                    From: {fromdata[0]?.fromUpazilaName} -{" "}
                                                                    {fromdata[0]?.fromBusStopStation}
                                                                </p>
                                                                <p>
                                                                    To: {fromdata[0]?.toUpazilaName} - {fromdata[0]?.toBusStopStation}
                                                                </p>
                                                                <p>Time Slot: {bus.timeSlot}</p>
                                                                <p>
                                                                    Available Seats:{" "}
                                                                    {isNaN(seatNumber)
                                                                        ? 0
                                                                        : bus?.seatingcapacity - Number(seatNumber)}
                                                                </p>
                                                            </div>

                                                   
                                                            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 gap-3">
                                                                <input
                                                                    type="number"
                                                                    className="input input-bordered w-full sm:max-w-xs"
                                                                    value={seatNumber}
                                                                    onChange={handleSeatNumberChange}
                                                                    min="1"
                                                                    max="5"
                                                                    placeholder="Number of seats"
                                                                />
                                                                <button
                                                                    className="btn bg-yellow-800 text-white w-full sm:w-auto"
                                                                    disabled={seatNumber < 1 || seatNumber > 5}
                                                                    onClick={handleConfirm}
                                                                >
                                                                    Confirm
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-lg">No bus available</p>
                        )}
                    </section>
                )}

                <SharedSection></SharedSection>
            </div>
        </div>
    );
};

export default FemaleBus;
