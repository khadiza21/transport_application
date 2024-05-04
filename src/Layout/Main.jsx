import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
<script src="https://kit.fontawesome.com/346effd3c4.js" crossorigin="anonymous"></script>

const Main = () => {
    const location = useLocation();

    const extractHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('earnmoneyauth');
    return (
        <div className="">
            {extractHeaderFooter || <Navbar></Navbar>}

            <Outlet></Outlet>
            {extractHeaderFooter || <Footer></Footer>}

        </div>
    )
}

export default Main;  