import { Link } from 'react-router-dom';

const Dashboard = ({ userRole }) => {
    console.log(userRole);
  const userOptions = [
    { title: 'Profile', link: '/profile' },
    { title: 'Send Emergency Notification', link: '/send-emergency' },
    { title: 'Home', link: '/' },
    { title: 'Add Review', link: '/add-review' },
    { title: 'History', link: '/history' },
  ];

  const adminOptions = [
    { title: 'Home', link: '/' },
    { title: 'Profile', link: '/profile' },
    { title: 'Vehicle Management', link: '/vehicle-management' },
    { title: 'Driver Management', link: '/driver-management' },
    { title: 'User Management', link: '/user-management' },
    { title: 'See Emergency Notifications', link: '/emergency-notifications' },
    { title: 'See Reviews', link: '/reviews' },
  ];

  const driverOptions = [
    { title: 'Home', link: '/' },
    { title: 'Profile', link: '/profile' },
    { title: 'Vehicle Profile', link: '/vehicle-profile' },
    { title: 'Drive Management', link: '/drive-management' },
    { title: 'History', link: '/history' },
  ];

  const options = userRole === 'admin' ? adminOptions  : userRole === 'primecardriver' ? driverOptions : userRole === 'maxcardriver' ? driverOptions :userRole === 'pluscardriver' ? driverOptions :   userRole === 'femalebus' ? driverOptions   : userRole === 'pubilcbus' ? driverOptions :  userOptions;

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {options.map((option, index) => (
                  <Link key={index} to={option.link} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                    {option.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      
      
    </div>
  );
};

export default Dashboard;
