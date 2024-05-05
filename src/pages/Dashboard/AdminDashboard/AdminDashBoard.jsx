import React from 'react';
import useUsersAuth from '../../../hooks/useUsersAuth';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AdminDashBoard = () => {
    const [userData, loading] = useUsersAuth(); 
    return (
        <div>
            <h1 className="font-bold  text-dark text-5xl m-10 p-10 text-center">admin dashboard</h1>
       
            <Link  className='flex justify-center items-center mt-2' to='/'><button className="btn btn-success"> GO Home</button></Link>
            <div>
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div>
                        {userData && (
                            <div className='text-center font-bold'>
                                <p>Name: {userData.name}</p>
                                <p>Email: {userData.email}</p>

                            </div>
                        )

                        }

                        {console.log(userData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashBoard;