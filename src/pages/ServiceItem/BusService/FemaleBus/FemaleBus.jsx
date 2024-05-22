import NavDashBoard from "../../../Shared/Navbar/NavDashBoard";
import SharedSection from "../SharedSection";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
const FemaleBus = () => {
    const { register, handleSubmit, reset } = useForm();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [busStopStation, setBusStopStation] = useState([]);


    const upazilaData = {
        upazilas: [
            {
                name: 'Dhanmondi',
                busStop: ['Russell Square', 'Kalabagan', 'Jhigatola', 'Dhanmondi 27', 'Shankar', 'Sobhanbagh', 'Dhanmondi 32', 'Satmasjid Road', 'Road 8A', 'Road 12', 'Science Lab', 'City College', 'Stamford University', 'Shimanto Square', 'Dhanmondi Lake', 'Mehedi Mart', 'Lalmatia', 'Rapa Plaza', 'Metro Shopping Mall', 'Sukrabad']
            },
            {
                name: 'Gulshan',
                busStop: ['Gulshan 1', 'Gulshan 2', 'Banani', 'Navana Tower', 'Gulshan Circle 2', 'Notun Bazar', 'Police Plaza', 'Niketan', 'Kamal Ataturk Avenue', 'Banani Chairman Bari', 'Banani 11', 'Gulshan Shooting Club', 'Pink City', 'Gulshan DCC Market', 'United Hospital', 'Gulshan Lake Park', 'Banani Graveyard', 'Gulshan Club', 'Lakeshore Hotel', 'Amari Dhaka']
            },
            {
                name: 'Mirpur',
                busStop: ['Mirpur 1', 'Mirpur 2', 'Mirpur 10', 'Kazipara', 'Shewrapara', 'Mirpur 12', 'Mirpur 14', 'Agargaon', 'Mirpur Cantonment', 'Pallabi', 'Mirpur Zoo', 'Mirpur Ceramic', 'Mirpur 11', 'Sony Cinema Hall', 'Mirpur 13', 'Shah Ali Market', 'Rupnagar', 'Proshika Mor', 'Mirpur Stadium', 'Mirpur Fire Service']
            },
            {
                name: 'Uttara',
                busStop: ['Uttara Sector 1', 'Uttara Sector 7', 'Uttara Sector 10', 'House Building', 'Jashimuddin', 'Azampur', 'Uttara Sector 3', 'Uttara Sector 4', 'Uttara Sector 6', 'Uttara Sector 12', 'Uttara Sector 9', 'Rajlaxmi Complex', 'Uttara Club', 'Uttara North Tower', 'Mascot Plaza', 'Fantasy Kingdom', 'Airport Station', 'Abdul Aziz School', 'Uttara High School', 'Sector 18']
            },
            {
                name: 'Mohammadpur',
                busStop: ['Asad Gate', 'Shyamoli', 'Kallyanpur', 'Mohammadpur Bus Stand', 'Town Hall', 'Nurjahan Road', 'Babor Road', 'College Gate', 'Mohammadpur Central College', 'Rayer Bazar', 'Tajmahal Road', 'Ring Road', 'Mohammadpur Krishi Market', 'Sangsad Bhaban', 'Dhanmondi 15', 'Shia Masjid', 'Japan Garden City', 'Adabor', 'Minar Mosque', 'Shekhertek']
            },
            {
                name: 'Badda',
                busStop: ['Rampura', 'Badda Link Road', 'Hatirjheel', 'Madhya Badda', 'North Badda', 'Merul Badda', 'Shahjadpur', 'Uttar Badda', 'Pragati Sharani', 'Aftab Nagar', 'Shantinagar', 'Mouchak', 'Malibagh', 'Basabo', 'Nadda', 'Kuril Bishwa Road', 'Natun Bazar', 'Baridhara', 'Banasree', 'Hazipara']
            },
            {
                name: 'Tejgaon',
                busStop: ['Tejgaon Industrial Area', 'Farmgate', 'Karwan Bazar', 'Tejturi Bazar', 'Nakhalpara', 'Moghbazar', 'Satrasta', 'Hatirjheel', 'Tejgaon College', 'Shaheenbagh', 'Bijoy Sarani', 'Bashundhara City', 'Kawran Bazar Kitchen Market', 'Green Road', 'Panthapath', 'West Nakhalpara', 'Kallyanpur', 'Gabtoli', 'Asad Avenue', 'Shukrabad']
            },
            {
                name: 'Lalbagh',
                busStop: ['Azimpur', 'Chawkbazar', 'Shahidnagar', 'Lalbagh Fort', 'Hazaribagh', 'New Market', 'Dhakeshwari Temple', 'Boro Katra', 'Ahsan Manzil', 'Sadarghat', 'Lalbagh Park', 'Lalbagh Road', 'Beauty Boarding', 'Lalbagh Mosque', 'Panghat Lane', 'Wiseghat', 'Postogola', 'Mitford Hospital', 'Sutrapur', 'Nimtali']
            },
            {
                name: 'Pallabi',
                busStop: ['Pallabi 11', 'Pallabi 12', 'Pallabi 14', 'Mirpur DOHS', 'Kalshi', 'Mirpur 13', 'Senpara Parbata', 'Mirpur Ceramic', 'Mirpur Bangla College', 'Ansar Camp', 'Mirpur 10 Circle', 'Mirpur 1 Circle', 'Mirpur 6', 'Mirpur 3', 'Mirpur 2 Circle', 'Bangla College', 'Mirpur Shopping Center', 'Pallabi Bazar', 'Graveyard Road', 'Pallabi Metro Rail Station']
            },
            {
                name: 'Ramna',
                busStop: ['Shahbagh', 'Bangla Motor', 'Kawran Bazar', 'Moghbazar', 'Eskaton', 'Paribagh', 'High Court', 'Press Club', 'Paltan', 'Katabon', 'Doel Chattar', 'Segunbagicha', 'Ramna Park', 'Dhaka University', 'TSC', 'National Museum', 'Bangabandhu Sheikh Mujib Medical University', 'Holy Family Hospital', 'Topkhana Road', 'Zero Point']
            },
            {
                name: 'Savar',
                busStop: ['Hemayetpur', 'Savar Bazar', 'Savar EPZ', 'Aminbazar', 'Nabinagar', 'Savar Dairy Farm', 'Radio Colony', 'Fantasy Kingdom', 'Jahangirnagar University', 'Ashulia', 'Savar Cantonment', 'Savar Bus Stand', 'C&B Bazar', 'Savar DOHS', 'Bishmail', 'Bank Town', 'Savar Upazila Parishad', 'Hajaribag', 'DEPZ', 'Genda']
            },
            {
                name: 'Keraniganj',
                busStop: ['Agnikanda', 'Nawabganj', 'Keraniganj Sadar', 'Kholamora', 'Jinjira', 'Kalatia', 'Taranagar', 'Subhadda', 'Atibazar', 'Kalindi', 'Rasulpur', 'Zinzira Bazar', 'Aga Sadek Road', 'Bandura', 'Keraniganj Model Town', 'Hazratpur', 'Ishwardi', 'Moinertek', 'Jinjira College', 'Bashundhara Riverview']
            },
            {
                name: 'Jatrabari',
                busStop: ['Sayedabad', 'Kaptan Bazar', 'Demra', 'Rayerbagh', 'Shonir Akhra', 'Jatrabari Intersection', 'Kajla', 'Matuail', 'Dayaganj', 'Kutubkhali', 'Kachpur', 'Postogola Bridge', 'Dania', 'Jatrabari Bazar', 'Signboard', 'Dhonia', 'Khilgaon', 'Khilgaon Taltola', 'Gulistan', 'Tikatuli']
            },
            {
                name: 'Khilgaon',
                busStop: ['Khilgaon Rail Gate', 'Goran', 'Tilpapara', 'Taltola', 'Nandipara', 'Basabo', 'South Goran', 'Aftab Nagar', 'Amulia', 'Khilgaon Flyover', 'Shantipur', 'Kamalapur', 'Shahjahanpur', 'Khilgaon High School', 'Motijheel', 'Khilgaon Taltola Market', 'Maniknagar', 'Basabo Balur Math', 'Rampura Bridge', 'Khilgaon Lake']
            },
            {
                name: 'Hazaribagh',
                busStop: ['Rayer Bazar', 'Dholpur', 'Hazaribagh Bazar', 'Ganaktuli', 'Kamrangirchar', 'Nawabganj Road', 'Dhanmondi Road 2', 'Beribadh', 'Kazi Riazuddin Road', 'Postogola', 'Hazaribagh Park', 'Hazaribagh Lake', 'Rayer Bazar Graveyard', 'Hazaribagh Bus Stand', 'Shahid Park', 'Basila', 'Tannery Mor', 'City Colony', 'Kalunagar', 'Nimtola']
            },
            {
                name: 'Demra',
                busStop: ['Staff Quarter', 'Demra Bazar', 'Konapara', 'Sarulia', 'Sultana Kamal Bridge', 'Matuail', 'Pagla', 'Demra Staff Quarter', 'Bashpatti', 'Shyampur', 'Shahjalal Avenue', 'Demra Bridge', 'Boubazar', 'Mugda', 'Manik Nagar', 'Jatrabari', 'Demra Ghat', 'Demra Chowrasta', 'Rajarbagh', 'Muradpur']
            },
            {
                name: 'Cantonment',
                busStop: ['Cantonment Station', 'MES', 'Matikata', 'ECB Chattar', 'Kalshi', 'Kurmitola', 'Bijoy Sarani', 'Mohakhali DOHS', 'Banani', 'Nikunja', 'Airport', 'Shewra', 'Dhaka Cantonment', 'Jahangir Gate', 'Cantonment Metro Station', 'Army Stadium', 'Staff Road', 'Peelkhana', 'Khilkhet', 'Bashundhara R/A']
            },
            {
                name: 'Bimanbandar',
                busStop: ['Airport Station', 'Kurmitola', 'Khilkhet', 'Airport Road', 'Uttara House Building', 'Uttara Azampur', 'Ashkona Hajj Camp', 'Airport Railway Station', 'Bashundhara', 'Nikunja 2', 'Airport Cargo', 'VIP Road', 'Airport Bimanbandar', 'Airport Army Camp', 'Airport Road Foot Overbridge', 'Bimanbandar Police Box', 'Hazrat Shahjalal Intl Airport', 'Uttara Gol Chattar', 'Airport T3', 'Le Meridien Dhaka']
            },
            {
                name: 'Shyampur',
                busStop: ['Danmondi Road', 'Kadamtali', 'Shyampur Bazar', 'Pagla', 'Jurain', 'Shyampur Staff Quarter', 'Matuail', 'Rayerbagh', 'Postogola', 'Dayaganj', 'Shampur Main Road', 'Shyampur Industrial Area', 'Shyampur Girls School', 'Dhonia', 'Jurain Graveyard', 'Mawa Ferry Ghat', 'Shyampur Health Complex', 'Jurain Rail Gate', 'Shyampur Bus Stand', 'Hasnabad']
            },
            {
                name: 'Khilkhet',
                busStop: ['Nikunj', 'Bashundhara', 'Khilkhet Bazar', 'Le Meridien', 'Kuril', 'Joar Sahara', 'Uttara Sector 4', 'Nikunja 2', 'Purbachal', 'Khilgaon Flyover', 'Shalna', 'Khilkhet Post Office', 'Jamuna Future Park', 'Nadda Bus Stand', 'Kuril Bishwa Road', 'Bashundhara Residential Area', 'Khilkhet Bus Stand', 'Haji Camp', 'Uttara Azampur', 'Rajuk Commercial Complex']
            }
        ],
        colors: ['Red', 'Blue', 'Green', 'Black', 'White'],
        areaCodes: ['DHA', 'CTG', 'RAJ', 'SYL', 'MY', 'NG', 'NR', 'NA', 'ND', 'NT', 'NK', 'NO', 'PB', 'PA', 'PT', 'PJ', 'RB', 'RM', 'RP', 'SK', 'SP', 'SH', 'SG'],
        categoryCodes: ['BHA', 'CHA', 'GA', 'GHA', 'KA', 'KHA', 'MA', 'PA', 'THA']
    };


    useEffect(() => {
        if (selectedUpazila) {
            const upazila = upazilaData.upazilas.find(u => u.name === selectedUpazila);
            setBusStopStation(upazila ? upazila.busStop : []);
        } else {
            setBusStopStation([]);
        }
    }, [selectedUpazila]);

    const handleUpazilaChange = (event) => {
        setSelectedUpazila(event.target.value);
    };

    const onSubmit = async (data) => {
        console.log(data);
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
                        <select
                            name="upazilaname"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("upazilaname")}
                            value={selectedUpazila}
                            onChange={handleUpazilaChange}
                        >
                            <option value="">Select an upazila</option>
                            {upazilaData.upazilas.map((upazila, index) => (
                                <option key={index} value={upazila.name}>{upazila.name}</option>
                            ))}
                        </select>

                        <select
                            name="busstopstation"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("busstopstation")}
                            defaultValue=''
                        >
                            <option value="">Select Bus Stop</option>
                            {busStopStation.map((busStop, index) => (
                                <option key={index} value={busStop}>{busStop}</option>
                            ))}
                        </select>

                        <input
                            className="btn btn-success py-2 px-4 font-bold"
                            type="submit"
                            value="Save"
                        />
                    </form>
                </section>



                <SharedSection></SharedSection>
            </div>



        </div>
    );
};

export default FemaleBus;
