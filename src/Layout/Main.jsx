import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
<script src="https://kit.fontawesome.com/346effd3c4.js" crossorigin="anonymous"></script>

const Main = () => {
    return (
        <div className="">
<Navbar></Navbar>           
<Outlet></Outlet>


<Footer></Footer>
        </div>
    )
}

export default Main; 