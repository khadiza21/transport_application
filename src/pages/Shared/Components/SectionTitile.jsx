const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8 font-bold">
             <h3 className="text-3xl uppercase border-y-4 py-4 mb-2">{heading}</h3>
            <p className="text-yellow-600">--- {subHeading} ---</p>
           
        </div>
    );
};

export default SectionTitle;      