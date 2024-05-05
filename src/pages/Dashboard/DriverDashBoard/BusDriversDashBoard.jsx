import { Link } from "react-router-dom";

const BusDriversDashBoard = () => {
    return (
        <div>
            <h1>bus driver</h1>
            <Link to='/'><button className="btn btn-success"> GO Home</button></Link>
        </div>
    );
};

export default BusDriversDashBoard;