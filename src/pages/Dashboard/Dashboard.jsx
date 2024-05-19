import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ userRole }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    console.log(userRole);
    const userOptions = [
        { title: 'Profile', link: '/userprofile' },
        { title: 'Send Emergency Notification', link: '/send-emergency' },
        { title: 'Home', link: '/' },
        { title: 'Add Review', link: '/addreview' },
        { title: 'History', link: '/history' },
    ];

    const adminOptions = [
        { title: 'Home', link: '/' },
        { title: 'Profile', link: '/adminprofile' },
        { title: 'Vehicle Management', link: '/vehicle-management' },
        { title: 'Driver Management', link: '/driver-management' },
        { title: 'User Management', link: '/user-management' },
        { title: 'See Emergency Notifications', link: '/emergency-notifications' },
        { title: 'See Reviews', link: '/allreview' },
    ];

    const driverOptions = [
        { title: 'Home', link: '/' },
        { title: 'Profile', link: '/busdriverprofile' },
        { title: 'Vehicle Profile', link: '/vehicleprofile' },
        { title: 'Drive Management', link: '/drive-management' },
        { title: 'History', link: '/history' },
    ];
    const crdriverOptions = [
        { title: 'Home', link: '/' },
        { title: 'Profile', link: '/cardriverprofile' },
        { title: 'Vehicle Profile', link: '/vehicleprofile' },
        { title: 'Drive Management', link: '/drive-management' },
        { title: 'History', link: '/history' },
    ];

    const options = userRole === 'admin' ? adminOptions : userRole === 'primecardriver' ? crdriverOptions : userRole === 'maxcardriver' ? crdriverOptions : userRole === 'pluscardriver' ? crdriverOptions : userRole === 'femalebus' ? driverOptions : userRole === 'pubilcbus' ? driverOptions : userOptions;

    return (
        <div className="bg-gray-200 min-h-screen">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Burger menu */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="block sm:hidden border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                            {/* End Burger menu */}

                            {/* Navigation links */}
                            <div className={`${menuOpen ? 'block' : 'hidden'} sm:-my-px sm:ml-6 sm:flex sm:space-x-8`}>
                                {options.map((option, index) => (
                                    <Link
                                        key={index}
                                        to={option.link}
                                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                    >
                                        {option.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Additional content */}
        </div>
    );
};

export default Dashboard;
