import Cover from '../Shared/Cover/Cover';
import contactVideo from '../../assets/contact-bg.mp4'
import emailjs from "@emailjs/browser";
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react';




const Contact = () => {

    const [messageError, setMessageError] = useState('');
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();



        const message = e.target.message.value.trim();
        if (!message) {
            setMessageError('Please write something ....');
        } else {
            setMessageError('');
        }

        emailjs.sendForm('service_jwjttgk', 'template_npae9y9', form.current, {
            publicKey: 'CQ5OKwfRskTWUvM5e',
        })
            .then(
                (result) => {
                    console.log(result.text, 'SUCCESS!');
                    toast.success("Successfully Sent Message !");
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        e.target.reset();
    }

    return (
        <div>
            <Helmet>
                <title>City Mover | Contact</title>
            </Helmet>
            <Cover videoBg={contactVideo} title="Contact With Us" btntext="Get Started" buttonText={'/'}></Cover >
            <div className="px-4 container mx-auto">

                <div className="mt-20 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-slate-800 py-10 sm:py-12 md:py-14 rounded-3xl inline-block">
                        <span className="text-yellow-500 font-bold">Contact with us, </span>
                        <span className="text-white font-bold">for your any valid query.</span>
                    </h1>
                </div>


                <div className="my-16">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-8">
                        Stay with CITY Mover
                    </h1>

                    <div className='flex flex-col lg:flex-row lg:flex-row-reverse gap-5'>
                        <div className='w-full lg:w-1/2'>
                            <ul>
                                <li>
                                    <h5>Address</h5>
                                    <p>Savar, Dhaka</p>
                                </li>
                                <li>
                                    <h5>Contact</h5>
                                    <p>+0000 000 000</p>
                                </li>
                                <li>
                                    <h5>Email</h5>
                                    <p>transport@gmail.com</p>
                                </li>
                            </ul>
                        </div>

                        <div className="card shrink-0 w-full mx-auto shadow bg-base-100 lg:w-1/2">
                            <form ref={form} onSubmit={sendEmail} className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="input input-bordered"
                                        name="user_name"
                                        required
                                    />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="input input-bordered"
                                        name="user_email"
                                        required
                                    />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Subject</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="input input-bordered"
                                        name="subject"
                                        required
                                    />
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Message</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Write your message"
                                        className="textarea textarea-bordered h-32 resize-none"
                                        required
                                    ></textarea>
                                    {messageError && (
                                        <p className="text-red-500 text-sm mt-2">{messageError}</p>
                                    )}
                                </div>


                                <div className="form-control mt-4">
                                    <button
                                        type="submit"
                                        className="btn bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Contact;


