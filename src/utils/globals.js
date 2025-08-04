export const PROJECT_NAME_TEXT = "Living World";

export const PROJECT_NAME = ({ className }) =>{ return (
    <div className={className}>Living World</div>
) };

export const PAIZO_CUP = ({className}) => { return (
    <div className={className}>
    <p><b>{PROJECT_NAME_TEXT}</b> uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (paizo.com/licenses/communityuse). We are expressly prohibited from charging you to use or access this content.</p>
    <p><b>{PROJECT_NAME_TEXT}</b> is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit <a href="http://paizo.com/">paizo.com</a>.</p>
    </div>
) };