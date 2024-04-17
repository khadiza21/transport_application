 
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Banner.css';
import img1 from '../../../assets/scotii.jpg';
import img2 from '../../../assets/2.jpg';

import img4 from '../../../assets/1.jpg';

const Banner = () => {
    return (
      
              <Carousel>
                <div>
                    <img src={img4} />
                  
                </div>
                <div>
                    <img src={img2}  />
                    
                </div>
                <div>
                    <img src={img1}  />
                  
                </div>
            </Carousel>
    
    );
};
 
export default Banner;