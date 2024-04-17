

const Review = ({ item }) => {
    const { id, name, img, review, star, } = item;
    return (

        <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center mb-4">
                <img src={img} alt="Reviewer" className="rounded-full w-12 h-12 mr-4" />
                <div>
                    <h3 className="font-semibold">{name}</h3>
                   
                    <h4>Star: {star}</h4>
                </div>
            </div>

             <p className="text-gray-800">{review}</p>
        </div>

    );
};

export default Review;

