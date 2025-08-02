import { PAIZO_CUP } from "src/utils/globals";
import "./footer.css";

const Footer = () => {


    return (
        <div className='footer'>
            <div className="Plogo"><img src="/P.png"/></div>
            <PAIZO_CUP className='paizo-cup' />
            <div className="footer-void"/>
        </div>
    );};

export default Footer;