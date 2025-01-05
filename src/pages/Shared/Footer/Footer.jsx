import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faEnvelope,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import applePlay from "../../../assets/applePlay.png";
import googlePlay from "../../../assets/googleplay.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="topright ">
      <footer className="footer py-10 bg-base-200  text-base-content lg:px-44 grid sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4">
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600">
            Useful Links
          </h6>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> About us
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Contact
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Blogs
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> FAQs
          </a>
        </nav>
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600">
            Policies
          </h6>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Terms of Service
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Privacy policy
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Cookie policy
          </a>
          <a className="link link-hover hover:text-yellow-600">
            <FontAwesomeIcon icon={faAnglesRight} /> Refund policy
          </a>
        </nav>
        <nav>
          <h6 className="footer-title border-b-2 border-yellow-600 text-yellow-600">
            Contact Info
          </h6>
          <nav>
            <ul>
              <li className="mb-1 text-sm  hover:text-yellow-600">
                <FontAwesomeIcon className="mr-2" icon={faLocationDot} /> Bangla
                Road Suite Dhaka 1205
              </li>
              <li className="mb-1 text-sm hover:text-yellow-600">
                <a
                  href="https://wa.me/0000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faSquareWhatsapp} className="mr-2" />
                  +000 000 000
                </a>
              </li>

              <li className="mb-1 text-sm hover:text-yellow-600">
                <a href="tel:+000000000" className="flex items-center">
                  <FontAwesomeIcon className="mr-2" icon={faPhoneVolume} /> +000
                  000 000
                </a>
              </li>

              <li className="mb-1 text-sm hover:text-yellow-600">
                <a
                  href="mailto:example@gmail.com"
                  className="flex items-center"
                >
                  <FontAwesomeIcon className="mr-2" icon={faEnvelope} />{" "}
                  example@gmail.com
                </a>
              </li>
            </ul>
          </nav>
        </nav>
        <nav>
          <h6 className="footer-title border-yellow-600 text-yellow-600 border-b-2">
            Download The App
          </h6>
          <div>
            <img
              className="my-3 cursor-pointer"
              src={googlePlay}
              alt="Google play store icon and text image"
            />
            <img
              className="my-3 cursor-pointer"
              src={applePlay}
              alt="Apple play store icon and text image"
            />
          </div>
        </nav>
      </footer>

      <footer className="footer px-44 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2  md:grid-cols-2 ">
          <aside className="items-center grid-flow-col">
            <aside>
              <p>
                Copyright © {currentYear}{" "}
                <span className="text-yellow-600 font-bold">
                  <Link
                    href="https://transport-female-application.web.app/"
                    target="_blank"
                  >
                    {" "}
                    City Mover
                  </Link>
                </span>{" "}
                Transport - All right reserved by BK Industries Ltd
              </p>
              <p className="">
                {" "}
                Developed By{" "}
                <span className="text-yellow-600 font-bold">
                  <Link
                    href="https://transport-female-application.web.app/"
                    target="_blank"
                  >
                    BK Team
                  </Link>{" "}
                </span>
              </p>
            </aside>
          </aside>

          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              <span>Follow us on: </span>

              {/* Twitter */}
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors transition duration-150 ease-in-out hover:animate-spin hover:text-yellow-600 text-blue-500"
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

              {/* YouTube */}
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors transition duration-150 ease-in-out hover:animate-spin hover:text-yellow-600  text-red-500"
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

              {/* Facebook */}
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors transition duration-150 ease-in-out hover:animate-spin hover:text-yellow-600  text-blue-600"
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
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
