import { PAIZO_CUP } from "src/utils/globals";
import "./footer.css";

const Footer = (props) => {


    return (
        <div
        id={props.id}
        className={props.className ?? 'footer'}
        >
            <div className="Plogo"><img src="/P.png"/></div>
            <PAIZO_CUP className='paizo-cup' />
            <div className="footer-void"/>
        </div>
    );};

export default Footer;