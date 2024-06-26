import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import BusService from "../pages/ServiceItem/BusService/BusService";
import CarService from "../pages/ServiceItem/CarService/CarService";

import CarPrime from "../pages/ServiceItem/CarService/CarPrime/CarPrime";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Authentication/Login/Login";
import CreateAccount from "../pages/Authentication/CreateAccount/CreateAccount";
import PrivateRoute from "./PrivateRoute";
import FemaleBus from "../pages/ServiceItem/BusService/FemaleBus/FemaleBus";
import PublicBus from "../pages/ServiceItem/BusService/PublicBus/PublicBus";
import EarnAuthCategory from "../pages/EarnAuthentication/EarnAuthCategory";
import DriversRoute from "./DriversRoute";
import BusDriversDashBoard from "../pages/Dashboard/DriverDashBoard/BusDriversDashBoard";
import BusDriverLog from "../pages/EarnAuthentication/Login/BusDriverLog";


import CarDriverDashBoard from "../pages/Dashboard/DriverDashBoard/CarDriverDashBoard";
import AdminProfile from "../pages/Profile/AdminProfile";
import UserProfile from "../pages/Profile/UserProfile";
import BusDriverProfile from "../pages/Profile/BusDriverProfile";
import CarDriverProfile from "../pages/Profile/CarDriverProfile";
import AddReviews from "../pages/Reviews/AddReviews";
import AllReviews from "../pages/Reviews/AllReviews";
import Vehicle from "../pages/Vehicle/Vehicle";
import ReqCarRide from "../pages/ServiceItem/CarService/ReqCarRide";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import CommonDashboard from "../pages/Dashboard/CommonDashbord/CommonDashboard";
import ManageUser from "../pages/Dashboard/AdminDashboard/ManageUser";
import ManageDriver from "../pages/Dashboard/AdminDashboard/ManageDriver";
import CarManage from "../pages/Dashboard/AdminDashboard/CarManage";
import ManageBus from "../pages/Dashboard/AdminDashboard/ManageBus";
import ManageBusDriver from "../pages/Dashboard/AdminDashboard/ManageBusDriver";
import BusVehicleProfile from "../pages/Vehicle/BusVehicleProfile";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: 'busService',
        element: <BusService></BusService>
      },
      {
        path: 'carService',
        element: <CarService></CarService>
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'contact',
        element: <Contact></Contact>

      },

      {
        path: 'primeCar',
        element: <PrivateRoute><CarPrime></CarPrime></PrivateRoute>
      },
      
      {
        path: 'femalebus',
        element: <PrivateRoute><FemaleBus></FemaleBus> </PrivateRoute>
      },
      {
        path: 'publicbus',
        element: <PrivateRoute> <PublicBus></PublicBus> </PrivateRoute>
      },

      {
        path: 'dashboard',
        element: <PrivateRoute> <CommonDashboard></CommonDashboard> </PrivateRoute>
      },
      {
        path: 'adminprofile',
        element: <PrivateRoute><AdminProfile></AdminProfile> </PrivateRoute>
      },
      {
        path: 'userprofile',
        element: <PrivateRoute> <UserProfile></UserProfile> </PrivateRoute>
      },
      {
        path: 'requestedcarride',
        element: <PrivateRoute><ReqCarRide></ReqCarRide> </PrivateRoute>
      },
      {
        path: 'allreview',
        element: <PrivateRoute> <AllReviews></AllReviews> </PrivateRoute>
      },
      {
        path: 'manageuser',
        element: <PrivateRoute> <ManageUser></ManageUser> </PrivateRoute>
      },
      {
        path: 'managecar',
        element: <PrivateRoute> <CarManage></CarManage></PrivateRoute>
      },
      {
        path: 'managebus',
        element: <PrivateRoute><ManageBus></ManageBus> </PrivateRoute>
      },
      {
        path: 'managecardriver',
        element: <PrivateRoute> <ManageDriver></ManageDriver> </PrivateRoute>
      },
      {
        path: 'managebusdriver',
        element: <PrivateRoute> <ManageBusDriver></ManageBusDriver> </PrivateRoute>
      },
      {
        path: 'historylist',
        element: <PrivateRoute> <OrderHistory></OrderHistory> </PrivateRoute>
      },

      {
        path: 'addreview',
        element: <PrivateRoute><AddReviews></AddReviews></PrivateRoute>
      },
      {
        path: 'busdriverprofile',
        element: <DriversRoute> <BusDriverProfile></BusDriverProfile> </DriversRoute>
      },
      {
        path: 'carvehicleprofile',
        element: <DriversRoute> <Vehicle></Vehicle> </DriversRoute>
      },
      {
        path: 'busvehicleprofile',
        element: <DriversRoute> <BusVehicleProfile></BusVehicleProfile> </DriversRoute>
      },
      {
        path: 'cardriverprofile',
        element: <DriversRoute> <CarDriverProfile></CarDriverProfile>  </DriversRoute>
      },
      {
        path: 'busdriverdashboard',
        element: <DriversRoute><BusDriversDashBoard></BusDriversDashBoard> </DriversRoute>
      },
      {
        path: 'cardriverdashboard',
        element: <DriversRoute> <CarDriverDashBoard></CarDriverDashBoard> </DriversRoute>
      },
      {
        path: 'notFound',
        element: <NotFound></NotFound>
      },
      {
        path: 'signupdriver',
        element: <BusDriverLog></BusDriverLog>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <CreateAccount></CreateAccount>
      },
      {
        path: 'earnmoneyauth',
        element: <EarnAuthCategory></EarnAuthCategory>
      }

    ]
  },
]);

