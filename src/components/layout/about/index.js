import "./about.css"

const About = (props) => {

    return (
        <section
            id = {props.id}
            className={props.className ?? "about"}
            style={{
                scrollMarginTop: 'var(--header-height, 0px)',
                minHeight: 'calc(100vh - var(--header-height, 0px) - var(--footer-height, 0px) - var(--contact-height, 0px))'
            }}
        >
            <h1>About</h1>
            <p>This is a work in progress of an automated browser living world framework to be hosted in the cloud.</p>
            <p>This is also a project of dream and passion, intended to be made to, by and for the entire Pathfinder 2e community.</p>
            <p>I have no company behind me, what means the project is solely in my hands to distribute freely without paywalls, P2W or microtransactions.</p>
            <p>It also means I need support to give myself entirely to this project.</p>
            <p>As more support I gather from the community, more of my time and energy I will be able to focus in it.</p>
            <p>Any contribution you can offer will be focused in making this project come alive to all of us.</p>
            <p>If you read it to this point, I can only hope you are interested enough to join and help anyway you can.</p>
            <div className="thank-you">Thank you</div> <h8>in advance.</h8>
            <div className="signature">- MaxRW</div>
        </section>
    )
}

export default About;