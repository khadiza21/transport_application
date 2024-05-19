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
import UserDashBoard from "../pages/Dashboard/UserDashBoard/UserDashBoard";
import AdminDashBoard from "../pages/Dashboard/AdminDashboard/AdminDashBoard";
import CarDriverDashBoard from "../pages/Dashboard/DriverDashBoard/CarDriverDashBoard";
import AdminProfile from "../pages/Profile/AdminProfile";
import UserProfile from "../pages/Profile/UserProfile";
import BusDriverProfile from "../pages/Profile/BusDriverProfile";
import CarDriverProfile from "../pages/Profile/CarDriverProfile";
import AddReviews from "../pages/Reviews/AddReviews";
import AllReviews from "../pages/Reviews/AllReviews";
import Vehicle from "../pages/Vehicle/Vehicle";


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
        path: 'userdashboard',
        element: <PrivateRoute><UserDashBoard></UserDashBoard> </PrivateRoute>
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
        path: 'allreview',
        element: <PrivateRoute> <AllReviews></AllReviews> </PrivateRoute>
      },
      {
        path: 'admindashboard',
        element: <PrivateRoute><AdminDashBoard></AdminDashBoard></PrivateRoute>
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
        path: 'vehicleprofile',
        element: <DriversRoute> <Vehicle></Vehicle> </DriversRoute>
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

