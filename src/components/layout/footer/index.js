import { PAIZO_CUP } from "src/utils/globals";
import "./footer.css";

const Footer = () => {
    return (
        <div className='footer'>
            <img className="Plogo" src="/P.png"/>
            <PAIZO_CUP className='paizo-cup' />
        </div>
    );};

export default Footer;