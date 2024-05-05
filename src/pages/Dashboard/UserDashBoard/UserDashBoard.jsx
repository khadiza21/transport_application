import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import useUsersAuth from '../../../hooks/useUsersAuth';
import { Link } from 'react-router-dom';

const UserDashBoard = () => {
    const [userData, loading] = useUsersAuth(); 
    return (
        <div>
            <h1>User DashBoard</h1>
            <Link to='/'><button className="btn btn-success"> GO Home</button></Link>
            <div>
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div>
                        {userData && (
                            <div>
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

export default UserDashBoard;