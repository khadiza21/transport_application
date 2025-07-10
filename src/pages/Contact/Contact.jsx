import Cover from '../Shared/Cover/Cover';
import contactVideo from '../../assets/contact-bg.mp4'
import emailjs from "@emailjs/browser";
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react';
import { MdEmail, MdPhoneAndroid } from "react-icons/md";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";


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

                    <div className='flex flex-col lg:flex-row gap-5'>

                        <div className=" shrink-0 w-full mx-auto lg:border-r lg:w-2/3 lg:pr-10">
                            <form ref={form} onSubmit={sendEmail} >

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
                        <div className='w-full lg:w-1/3'>

                            <ul className="py-6 h-full space-y-5 lg:space-y-10">

                                <li className="flex  py-8 w-full flex-row-reverse gap-10 text-right rounded-xl ">
                                    <div className="text-yellow-600 hover:text-gray-500 text-2xl mt-1">
                                        <FaMagnifyingGlassLocation className='text-5xl' />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Address</h5>
                                        <p className='text-gray-500'>Savar, Dhaka</p>
                                    </div>
                                </li>

                                <li className="flex py-8 w-full flex-row-reverse gap-10 text-right rounded-xl ">
                                    <div className="text-yellow-600 hover:text-gray-500 text-2xl mt-1">
                                        <MdPhoneAndroid className='text-5xl' />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Contact</h5>
                                        <p className='text-gray-500'>+0000 000 000</p>
                                    </div>
                                </li>

                                <li className="flex py-8 w-full flex-row-reverse gap-10 text-right rounded-xl ">
                                    <div className="text-yellow-600 hover:text-gray-500 text-2xl mt-1">
                                        <MdEmail className='text-5xl' />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-lg mb-1">Email</h5>
                                        <p className='text-gray-500'>transport@gmail.com</p>
                                    </div>
                                </li>
                            </ul>

                        </div>



                    </div>
                </div>


            </div>
            <div className="mt-40">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24478.772491137097!2d90.25552137795968!3d23.839573396174313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755eb0044ea1bcb%3A0xd0c28ea1db9bb194!2sSavar%20Dhaka%20Bangladesh!5e1!3m2!1sen!2sbd!4v1752134181313!5m2!1sen!2sbd" height="300" className='border-0 w-full' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;