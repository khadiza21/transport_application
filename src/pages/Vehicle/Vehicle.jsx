import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import useCarDriverData from "../../hooks/useCarDriverData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";





const Vehicle = () => {

    const { register, handleSubmit, reset } = useForm();
    const [cardriverData, loading] = useCarDriverData();
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);
    const [isFormReady, setIsFormReady] = useState(false);
    console.log(cardriverData?.name, cardriverData)

    const carData = {
        brands: [
            { name: 'Toyota', models: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander'] },
            { name: 'Honda', models: ['Civic', 'Accord', 'Fit', 'CR-V', 'Pilot'] },
            { name: 'Ford', models: ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'F-150'] },
            { name: 'BMW', models: ['3 Series', '5 Series', 'X1', 'X3', 'X5'] },
            { name: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y'] },
            { name: 'Chevrolet', models: ['Spark', 'Malibu', 'Impala', 'Equinox', 'Tahoe'] },
            { name: 'Nissan', models: ['Sentra', 'Altima', 'Maxima', 'Rogue', 'Murano'] },
            { name: 'Volkswagen', models: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas'] },
            { name: 'Hyundai', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'] },
            { name: 'Kia', models: ['Rio', 'Forte', 'Optima', 'Sorento', 'Sportage'] },
            { name: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLE'] },
            { name: 'Audi', models: ['A3', 'A4', 'A6', 'Q3', 'Q5'] },
            { name: 'Subaru', models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek'] },
            { name: 'Mazda', models: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9'] },
            { name: 'Lexus', models: ['IS', 'ES', 'GS', 'RX', 'NX'] },
            { name: 'Jeep', models: ['Wrangler', 'Cherokee', 'Grand Cherokee', 'Compass', 'Renegade'] },
            { name: 'Volvo', models: ['S60', 'S90', 'XC40', 'XC60', 'XC90'] },
            { name: 'Porsche', models: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'] },
            { name: 'Jaguar', models: ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace'] },
            { name: 'Land Rover', models: ['Range Rover', 'Discovery', 'Defender', 'Evoque', 'Velar'] }
        ],
        colors: ['Red', 'Blue', 'Green', 'Black', 'White'],
        areaCodes: ['DHA', 'CTG', 'RAJ', 'SYL', 'MY', 'NG', 'NR', 'NA', 'ND', 'NT', 'NK', 'NO', 'PB', 'PA', 'PT', 'PJ', 'RB', 'RM', 'RP', 'SK', 'SP', 'SH', 'SG'],
        categoryCodes: ['BHA', 'CHA', 'GA', 'GHA', 'KA', 'KHA', 'MA', 'PA', 'THA']
    };
    useEffect(() => {
        if (selectedBrand) {
            const brand = carData.brands.find(b => b.name === selectedBrand);
            setModels(brand ? brand.models : []);
        } else {
            setModels([]);
        }
    }, [selectedBrand]);


    useEffect(() => {
        if (cardriverData && cardriverData.email && cardriverData.role && cardriverData.name) {
            setIsFormReady(true);
        }
    }, [cardriverData]);

    const handleBrandChange = (event) => {

        setSelectedBrand(event.target.value);
    };



    const onSubmit = async (data) => {
        const registrationNumber = `${data.areaCode}-${data.categoryCode}-${data.number}`;
        const formData = {
            email: cardriverData?.email,
            role: cardriverData?.role,
            name: cardriverData?.name,
            ...data,
            registrationNumber
        };
        console.log(formData, 'form data');

        try {
            const response = await axios.post('https://transport-server2-1.onrender.com/cardata', formData);
            console.log(response.data);
            reset();
            toast.success("Successfully sent data !");

        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div class="container mx-auto my-5 py-5 shadow-lg rounded-lg ">
            <h2 className="text-4xl font-bold mb-4 text-center">Car Profile Form</h2>
            <form
                className="flex flex-col w-3/4 mx-auto mt-8 bg-white overflow-hidden "
                onSubmit={handleSubmit(onSubmit)}
            >



                <input
                    name="email"
                    defaultValue={cardriverData?.email}
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    placeholder="Email"
                    {...register("email")}
                    readOnly
                />
                <input
                    name="name"
                    defaultValue={cardriverData?.name
                    }
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    {...register("name")}
                    placeholder="Name"
                    readOnly
                />
                <input
                    name="role"
                    value={cardriverData?.role}
                    class="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                    {...register("role")}
                    placeholder="Role "
                    readOnly
                />


                {cardriverData?.role === 'primecardriver' ? (
                    <input
                        value="Prime Car"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("cartype")}
                        placeholder="Car Type"
                        readOnly
                    />
                ) : cardriverData?.role === 'maxcardriver' ? (
                    <input
                        value="Max Car"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("cartype")}
                        placeholder="Car Type"
                        readOnly
                    />
                ) : (
                    <input
                        value="Plus Car"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("cartype")}
                        placeholder="Car Type"
                        readOnly
                    />
                )}


                <select
                    name="brandname"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("brandname")}

                    value={selectedBrand}
                    onChange={handleBrandChange}
                >


                    {carData.brands.map((brand, index) => (
                        <option key={index} value={brand.name}>{brand.name}</option>
                    ))}

                </select>

                <select
                    name="modelname"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("modelname")}
                    defaultValue=''
                >
                    <option value="">Select Model</option>
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}

                </select>

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
                        {carData.areaCodes.map((code, index) => (
                            <option key={index} value={code}>{code}</option>
                        ))}
                    </select>




                    <select
                        name="categoryCode"
                        className="mb-3 py-2 px-4 border border-gray-300 rounded"
                        {...register("categoryCode", { required: true })}
                    >
                        <option value="">Select Category Code</option>
                        {carData.categoryCodes.map((code, index) => (
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




                <input
                    type="number"
                    name="chargePerKm"
                    placeholder="Charge Per KM"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("chargePerKm", { required: true })}
                />


                <select
                    name="color"
                    className="mb-3 py-2 px-4 border border-gray-300 rounded"
                    {...register("color")}
                >
                    <option value="">Select Color</option>
                    {carData.colors.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))}
                </select>
                <input
                    class="btn btn-success py-2 px-4 font-bold"
                    type="submit"
                    value="Save"
                />
            </form>
            <Link to='/cardriverdashboard'>   <button className="btn bg-slate-500 flex flex-col w-3/4 mx-auto mb-10 mt-4 bg-white shadow-lg rounded-lg overflow-hidden p-6 font-bold">GO Back </button></Link>

        </div>
    );
};

export default Vehicle;