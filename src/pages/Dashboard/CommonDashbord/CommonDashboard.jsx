import useUsersAuth from '../../../hooks/useUsersAuth';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import carimg from '../../../assets/car.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import contactVideo from '../../../assets/contact-bg.mp4'

const CommonDashboard = () => {
    const [userData, loading] = useUsersAuth();

    if (loading) {
        return <Loading></Loading>;
    };

    return (
        <div>
            <NavDashBoard />

            {userData && userData?.role === 'user' ? (
                <div>

                    <Cover videoBg={contactVideo} title="Enjoy Your Trip" btntext="Get Started" buttonText={'/'}></Cover >

                    <div className="px-4 container mx-auto md:px-10 lg:px-20 my-20 py-20">
                        <div className="card lg:card-side bg-base-100 flex flex-col lg:flex-row gap-6">
                            <figure className="p-4 lg:p-0">
                                <img
                                    className="rounded-xl shadow-xl w-full max-w-md mx-auto"
                                    src="https://t3.ftcdn.net/jpg/00/85/13/32/360_F_85133296_uRf7VrGLUDUj8Tq2kvCSViGxYE4vRQxB.jpg"
                                    alt="Album"
                                />
                            </figure>
                            <div className="card-body px-4 lg:pl-10 justify-center">
                                <h2 className="card-title text-3xl lg:text-4xl font-bold">Car Ride Available For All!</h2>
                                <p className="text-gray-500">
                                    Click the button to listen on Spotiwhy app. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Modi aspernatur id quo eos suscipit accusantium totam dolorem veniam ducimus? Consequuntur.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link to="/primeCar">
                                        <button className="btn bg-slate-900 text-white hover:bg-slate-800">Book Car</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Cover videoBg={contactVideo} title="Enjoy Your Trip" btntext="Get Started" buttonText={'/'}></Cover >

                    <div className="px-4 md:px-10 lg:px-20 py-10 my-16">
                        <div className="hero bg-base-100 rounded-lg">
                            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                                <img
                                    src="/bus.png"
                                    className="w-full max-w-sm"
                                    alt="Bus Service"
                                />
                                <div>
                                    <h1 className="text-3xl lg:text-5xl font-bold">Bus Service Available for all ride!</h1>
                                    <p className="py-4 text-gray-600">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
                                        deleniti eaque aut repudiandae et a id nisi.
                                    </p>
                                    <Link to="/busService">
                                        <button className="btn bg-slate-900 text-white hover:bg-slate-800">Take Service</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div>

                        <div className="carousel w-full">
                            {['1', '2', '3', '4'].map((id) => (
                                <div key={id} id={`item${id}`} className="carousel-item w-full">
                                    <img
                                        src={`https://img.daisyui.com/images/stock/photo-16${id === '1' ? '25' : id === '2' ? '09' : id === '3' ? '14' : '66'}-sample.jpg`}
                                        className="w-full object-cover"
                                        alt={`Slide ${id}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center w-full py-2 gap-2">
                            {['1', '2', '3', '4'].map((id) => (
                                <a key={id} href={`#item${id}`} className="btn btn-xs">
                                    {id}
                                </a>
                            ))}
                        </div>
                    </div>


                    <section className="px-4 md:px-10 lg:px-20 my-10">
                        <div className="join join-vertical w-full shadow-xl bg-slate-100">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="collapse collapse-arrow join-item border border-slate-300 p-2">
                                    <input type="radio" name="my-accordion-4" defaultChecked={item === 1} />
                                    <div className="collapse-title text-lg md:text-xl font-medium font-bold text-slate-900">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="collapse-content text-gray-500">
                                        <p>
                                            Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sapiente distinctio reprehenderit
                                            explicabo inventore, veniam culpa totam laboriosam est placeat.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    <footer className="footer items-center p-6 bg-neutral text-neutral-content px-4 md:px-10 lg:px-20 text-center">
                        <aside className="items-center grid-flow-col">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-current"
                            >
                                <path d="M22.672 15.226..." />
                            </svg>
                            <p className="ml-4">Copyright © 2024 - All right reserved</p>
                        </aside>
                        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end mt-4 md:mt-0">
                            <a>{/* Twitter */}</a>
                            <a>{/* YouTube */}</a>
                            <a>{/* Facebook */}</a>
                        </nav>
                    </footer>
                </>
            )}
        </div>

    );
};

export default CommonDashboard;