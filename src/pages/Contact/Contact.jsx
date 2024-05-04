import Cover from '../Shared/Cover/Cover';
import contact from '../../assets/contact.jpg'
import emailjs from "@emailjs/browser";
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';




const Contact = () => {


    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

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
            <Cover img={contact} title="Contact With Us" btntext="Go Home" buttonText={'/'}></Cover >
            <div className='px-44'>

                <div className='mt-28 '>
                    <h1 className='text-7xl  bg-slate-800 py-16 px-10 rounded-[70px] '><span className='text-yellow-500 font-bold'>Contact with us,</span> <span className='text-white font-bold'>for your any valid query. </span> </h1>
                </div>

                <div className='my-24'> <h1 className="titlesecnew font-bold text-4xl mt-28">Stay with CITY Mover</h1>



                    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                        <form ref={form} onSubmit={sendEmail} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" name='user_name' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input name='user_email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Subject</span>
                                </label>
                                <input name='subject' type="text" placeholder="subject" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Message</span></label>
                                <textarea id="message" name="message" className="w-full h-32   py-1 px-3 input input-bordered "></textarea>
                            </div>

                            <div className="form-control mt-4">
                                <button className='btn bg-yellow-600 hover:bg-yellow-700 font-bold' type="submit">Send Message</button>

                            </div>
                        </form>



                    </div></div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;


