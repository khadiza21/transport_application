import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faEnvelope,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import applePlay from "../../../assets/applePlay.png";
import googlePlay from "../../../assets/googleplay.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full">
      <footer className="bg-base-200 text-base-content py-10 px-4 sm:px-10 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600 mb-2">Useful Links</h6>
          {["About us", "Contact", "Blogs", "FAQs"].map((item, i) => (
            <a key={i} className="link link-hover hover:text-yellow-600 block">
              <FontAwesomeIcon icon={faAnglesRight} className="mr-2" /> {item}
            </a>
          ))}
        </nav>
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600 mb-2">Policies</h6>
          {["Terms of Service", "Privacy policy", "Cookie policy", "Refund policy"].map((item, i) => (
            <a key={i} className="link link-hover hover:text-yellow-600 block">
              <FontAwesomeIcon icon={faAnglesRight} className="mr-2" /> {item}
            </a>
          ))}
        </nav>
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600 mb-2">Contact Info</h6>
          <ul>
            <li className="mb-1 text-sm hover:text-yellow-600">
              <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
              Bangla Road Suite Dhaka 1205
            </li>
            <li className="mb-1 text-sm hover:text-yellow-600">
              <a href="https://wa.me/0000000000" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <FontAwesomeIcon icon={faSquareWhatsapp} className="mr-2" />
                +000 000 000
              </a>
            </li>
            <li className="mb-1 text-sm hover:text-yellow-600">
              <a href="tel:+000000000" className="flex items-center">
                <FontAwesomeIcon icon={faPhoneVolume} className="mr-2" />
                +000 000 000
              </a>
            </li>
            <li className="mb-1 text-sm hover:text-yellow-600">
              <a href="mailto:example@gmail.com" className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                example@gmail.com
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600 mb-2">Download The App</h6>
          <div>
            <img src={googlePlay} alt="Google Play" className="my-3 cursor-pointer w-36" />
            <img src={applePlay} alt="Apple Play" className="my-3 cursor-pointer w-36" />
          </div>
        </nav>
      </footer>

      <footer className="bg-base-200 text-base-content px-4 sm:px-10 lg:px-24 py-4 border-t border-base-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p>
              © {currentYear} 
              <Link to="https://transport-female-application.web.app/" target="_blank" className="mx-1 uppercase text-yellow-600 font-bold">
                 City Mover
              </Link>
              Transport - All rights reserved by BK Industries Ltd.
            </p>
            <p>
              Developed By
              <Link to="https://transport-female-application.web.app/" target="_blank" className="uppercase mx-1 text-yellow-600 font-bold">
                BK Team
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Follow us on:</span>

            <Link
              to="https://twitter.com"
              target="_blank"
              className="text-blue-500 hover:text-yellow-600 transition hover:animate-spin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </Link>

            <Link
              to="https://youtube.com"
              target="_blank"
              className="text-red-500 hover:text-yellow-600 transition hover:animate-spin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </Link>

            <Link
              to="https://facebook.com"
              target="_blank"
              className="text-blue-600 hover:text-yellow-600 transition hover:animate-spin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
