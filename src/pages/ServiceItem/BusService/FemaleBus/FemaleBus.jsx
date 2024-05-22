import NavDashBoard from "../../../Shared/Navbar/NavDashBoard";
import { FaBus, FaLock, FaSearch } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { TbCoinTaka, TbCoinTakaFilled } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
const FemaleBus = () => {
    return (
        <div>
            <NavDashBoard></NavDashBoard>

            <div className="px-44 mx-auto my-14">
                <hr  class="border-none h-1 bg-yellow-600 my-5"/>
           
                <section>
                    <div className="my-5"><hr />
                        <h1 className="text-center text-2xl font-bold py-2 text-yellow-600">Buy bus tickets in 3 easy steps</h1><hr /></div>

                    <div class="grid grid-cols-3 gap-4">
                        <div className="flex justify-center items-center gap-5">
                            <div className="h-20 w-20 rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center"><FaSearch className="text-slate-900 font-bold text-4xl" /></div>
                            <div><h1 className="text-3xl font-bold ">Search</h1>
                                <small className="text-gray-500 ">
                                    Choose your origin, destination, times and search for buses</small>
                            </div>
                        </div>


                        <div className="flex justify-center items-center gap-5">
                            <div className="h-20 w-20 rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center"><FaBus className="text-slate-900 font-bold text-4xl" /></div>
                            <div><h1 className="text-3xl font-bold ">Select</h1>
                                <small className="text-gray-500 ">Select your desired ticket and choose your seats
                                </small>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-5">
                            <div className="h-20 w-20 rounded-xl shadow-xl bg-yellow-600 flex items-center justify-center"><TbCoinTakaFilled className="text-slate-900 font-bold text-4xl" /></div>
                            <div><h1 className="text-3xl font-bold ">Pay</h1>
                                <small className="text-gray-500 ">
                                    Pay by payement getway and confirm ticket</small>
                            </div>
                        </div>
                        {/* <FaBangladeshiTakaSign />

<TbCoinTaka />
< /> */}
                     

                    </div>
                </section>


                <section>
                    <div class="grid grid-cols-2 gap-8 my-14">
                        <div className=" roudend-xl  shadow-lg flex justify-center items-center my-2 gap-5 text-xl py-3 px-3 bg-slate-100">
                            <FaLock className="text-yellow-600" />
                            <h1 >Safe and Secure online payments</h1>

                        </div>
                        <div className=" roudend-xl  shadow-lg flex justify-center items-center my-2 gap-5 text-xl py-3 px-3 bg-slate-100">
                            <IoHome className="text-yellow-600" />
                            <h1 >Safe and Comfortable Moving   </h1>

                        </div>
                    </div>
                </section>
            </div>



        </div>
    );
};

export default FemaleBus;
