import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import BusService from "../pages/ServiceItem/BusService/BusService";
import CarService from "../pages/ServiceItem/CarService/CarService";
import BikeService from "../pages/ServiceItem/BikeService/BikeService";
import CarMax from "../pages/ServiceItem/CarService/CarMax/CarMax";
import CarPlus from "../pages/ServiceItem/CarService/CarPlus/CarPlus";
import CarPrime from "../pages/ServiceItem/CarService/CarPrime/CarPrime";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Authentication/Login/Login";
import CreateAccount from "../pages/Authentication/CreateAccount/CreateAccount";
import PrivateRoute from "./PrivateRoute";
import FemaleBus from "../pages/ServiceItem/BusService/FemaleBus/FemaleBus";
import PublicBus from "../pages/ServiceItem/BusService/PublicBus/PublicBus";
import BikeDetails from "../pages/ServiceItem/BikeService/BikeDetails/BikeDetails";
import Schotydetails from "../pages/ServiceItem/BikeService/ScotyDetails.jsx/Schotydetails";
import EarnAuthCategory from "../pages/EarnAuthentication/EarnAuthCategory";
import BusDriver from "../pages/EarnAuthentication/CreateAccount/BusDriver";
import CarDriver from "../pages/EarnAuthentication/CreateAccount/CarDriver";
import BikerDriver from "../pages/EarnAuthentication/CreateAccount/BikerDriver";
import DriversRoute from "./DriversRoute";

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
        path: 'bikeService',
        element: <BikeService></BikeService>
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
        path: 'plusCar',
        element: <PrivateRoute><CarPlus></CarPlus></PrivateRoute>
      },
      {
        path: 'primeCar',
        element: <PrivateRoute><CarPrime></CarPrime></PrivateRoute>
      },
      {
        path: 'maxCar',
        element: <PrivateRoute><CarMax></CarMax></PrivateRoute>
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
        path: 'bikeside',
        element: <PrivateRoute> <BikeDetails></BikeDetails> </PrivateRoute>
      },
      {
        path: 'scotyside',
        element: <PrivateRoute> <Schotydetails></Schotydetails> </PrivateRoute>
      },
      {
        path: 'busdriver',
        element: <DriversRoute><BusDriver></BusDriver> </DriversRoute>
      },
      {
        path: 'cardriver',
        element: <DriversRoute><CarDriver></CarDriver> </DriversRoute>
      },
      {
        path: 'bikedriver',
        element: <DriversRoute><BikerDriver></BikerDriver> </DriversRoute>
      },
      {
        path: 'notFound',
        element: <NotFound></NotFound>
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

