import { PROJECT_NAME } from "src/utils/globals.js";
import "./header.css";
import { Link } from "react-scroll";

const Header = () => {
    return (
        <div className='header'>
            <img className="logo" src="/LWlogo.png"/>
            <PROJECT_NAME className="project-name"/>
            <div className="about-link"><Link to="about" smooth={true} duration={2000} className="about-link">About</Link></div>
        </div>
    );
};

export default Header;