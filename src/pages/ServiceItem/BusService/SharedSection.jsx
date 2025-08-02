
import { FaBus, FaLock, FaSearch } from "react-icons/fa";
import {  TbCoinTakaFilled } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
const SharedSection = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <hr className="border-none h-1 bg-yellow-600 my-5" />

            <section>
                <div className="my-5">
                    <hr />
                    <h1 className="text-center text-xl sm:text-2xl font-bold py-2 text-yellow-600">
                        Buy bus tickets in 3 easy steps
                    </h1>
                    <hr />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                    <div className="flex items-start gap-4">
                        <div className="h-20 w-20 min-w-[80px] rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center">
                            <FaSearch className="text-slate-900 font-bold text-4xl" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-1">Search</h2>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Choose your origin, destination, times and search for buses.
                            </p>
                        </div>
                    </div>

             
                    <div className="flex items-start gap-4">
                        <div className="h-20 w-20 min-w-[80px] rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center">
                            <FaBus className="text-slate-900 font-bold text-4xl" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-1">Select</h2>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Select your desired ticket and choose your seats.
                            </p>
                        </div>
                    </div>

                   
                    <div className="flex items-start gap-4">
                        <div className="h-20 w-20 min-w-[80px] rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center">
                            <TbCoinTakaFilled className="text-slate-900 font-bold text-4xl" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-1">Pay</h2>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Pay via payment gateway and confirm your ticket.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

         
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">
                    <div className="rounded-xl shadow-lg flex items-center gap-4 text-base sm:text-lg p-4 bg-slate-100">
                        <FaLock className="text-yellow-600 text-2xl" />
                        <h2 className="font-medium">Safe and Secure Online Payments</h2>
                    </div>

                    <div className="rounded-xl shadow-lg flex items-center gap-4 text-base sm:text-lg p-4 bg-slate-100">
                        <IoHome className="text-yellow-600 text-2xl" />
                        <h2 className="font-medium">Safe and Comfortable Moving</h2>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default SharedSection;