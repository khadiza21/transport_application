const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="w-full px-4 md:px-0 w-1/2 md:w-4/12 mx-auto text-center my-4">
            <h3 className="text-sm sm:text-2xl md:text-3xl font-bold uppercase border-y-2 md:border-y-4 py-2 md:py-4 mb-2">
                {heading}
            </h3>
            <p className="text-yellow-600 text-xs sm:text-base">--- {subHeading} ---</p>
        </div>
    );
};

export default SectionTitle;      