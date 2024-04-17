

const Review = ({ item }) => {
    const { id, name, img, review, star, } = item;
    return (
     
           <div className="">
                <img className="w-[120px]" src={img} />
                <div>
                    <h3 className="uppercase">{name}</h3>
                    <h5>Review: {review}</h5>
                    <h4>Star: {star}</h4>
                </div>
           </div>
      
    );
};

export default Review;

