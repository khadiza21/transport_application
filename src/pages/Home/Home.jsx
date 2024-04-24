import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Reviews from "./Reviews/Reviews";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>City Mover | Home</title>
            </Helmet>
            <Banner></Banner>
            <Categories></Categories>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;