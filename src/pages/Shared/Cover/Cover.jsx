import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";


const Cover = ({ img, title,btntext,buttonText }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="car services"
            strength={-200}
        >
            <div>
                <div className="hero min-h-[600px] max-h-[700px]" >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                         <Link  to={buttonText}>   <button className="btn btn-warning font-bold px-10">{btntext}    </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;