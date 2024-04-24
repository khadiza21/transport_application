import useCarService from "../../../../hooks/useCarService";

const CarMax = () => {

    const [carItems] = useCarService([]);
    const max = carItems.filter(item => item.category == 'max');
    return (
        <div>

            <h1>The number of max car : {max.length()}</h1>
            {/* {
                max.map(item => <MenuCar

                    key={item._id}
                    item={item}
                >

                </MenuCar>)
            } */}
        </div>
    );
};

export default CarMax;