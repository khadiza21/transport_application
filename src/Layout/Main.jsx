import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
<script src="https://kit.fontawesome.com/346effd3c4.js" crossorigin="anonymous"></script>

const Main = () => {
    const location = useLocation();
    console.log(location);
    const extractHeaderFooter = location.pathname.includes('login');
    return (
        <div className="">
            { extractHeaderFooter ||  <Navbar></Navbar>}
           
            <Outlet></Outlet>
            { extractHeaderFooter || <Footer></Footer>}
            
        </div>
    )
}

export default Main; 