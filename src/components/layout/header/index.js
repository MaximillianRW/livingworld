import { PROJECT_NAME } from "src/utils/globals.js";
import "./header.css";
//import { Link } from "react-scroll";
import { HashLink } from "react-router-hash-link";

const Header = (props) => {
    return (
        <div
        id={props.id}
        className={props.className ?? 'header'}
        >
            <img className="logo" src="/LWlogo.png"/>
            <PROJECT_NAME className="project-name"/>
            <div><HashLink to='#About' smooth={true}>About</HashLink></div>
        </div>
    );
};

export default Header;