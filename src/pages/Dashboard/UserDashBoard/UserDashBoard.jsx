import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import useUsersAuth from '../../../hooks/useUsersAuth';

import Dashboard from '../Dashboard';

const UserDashBoard = () => {
    const [userData, loading] = useUsersAuth();
    return (
        <div>
            <h1 className="font-bold  text-dark text-5xl m-10 p-10 text-center">User DashBoard</h1>
            {/* <Link className='flex justify-center items-center mt-2' to='/'><button className="btn btn-success "> GO Home</button></Link> */}
            <div>
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div>
                        {userData && (<>

                            <div className='text-center font-bold'>
                                <p>Name: {userData.name}</p>
                                <p>Email: {userData.email}</p>
                                {console.log('test admindahs', userData.email)}

                            </div >


                            <Dashboard value={userData.role} ></Dashboard>
                        </>
                        )

                        }

                        {console.log(userData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashBoard;