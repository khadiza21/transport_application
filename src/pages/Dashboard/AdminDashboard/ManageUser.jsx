import React from 'react';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import useUsersAuth from '../../../hooks/useUsersAuth';

const ManageUser = () => {
    const [userData, loading] = useUsersAuth();
    return (
        <div>
             <NavDashBoard></NavDashBoard>
           <div className="p-4">
      <h1 className="text-2xl font-bold">user Management</h1>

    </div>
        </div>
    );
};

export default ManageUser;