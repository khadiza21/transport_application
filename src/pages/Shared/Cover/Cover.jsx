import { Parallax } from "react-parallax";

const Cover = ({ videoBg, title, btntext }) => {
    return (

        <Parallax
            className="relative h-screen w-full overflow-hidden"
            blur={{ min: -50, max: 50 }}
            strength={-200}
        >
            <video
                className="absolute top-0 left-0 w-full h-screen object-cover z-0"
                src={videoBg}
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="absolute inset-0 bg-black/60 z-1 h-screen" />

            <div className="relative z-5 flex items-center justify-center h-screen text-white text-center px-4">
                <div className="max-w-2xl">
                    <h1 className="mb-4 text-4xl sm:text-5xl font-bold uppercase">
                        {title}
                    </h1>
                    <p className="text-gray-400 sm:text-lg my-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="cursor btn btn-warning">
                        {btntext}
                    </button>
                </div>
            </div>
        </Parallax>


    );
};

export default Cover;