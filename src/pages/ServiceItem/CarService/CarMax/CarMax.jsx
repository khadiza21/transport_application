import useCarService from "../../../../hooks/useCarService";

import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
const CarMax = () => {

    const [carItems] = useCarService([]);
    //const max = carItems.filter(item => item.category == 'max');
    return (
        <div className="">

            <Helmet>
                <title>City Mover | Car Max Service</title>
            </Helmet>
            <Cover img={carmax} title="Car max services"></Cover>

        </div>
    );
};

export default CarMax;