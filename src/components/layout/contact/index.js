import "./contact.css"

const Contact = () => {
    return (
        <section className="contact">
            <div className="contact-body">
                <div className="contact-means">
                    <h1>Contact</h1>
                    <div className="contact-body-img-cont"><a href="https://discord.gg/W5zD5jdWtT"><img src="/imagens/media/discord.png"/></a></div>
                </div>
                <div className="contact-support">
                    <h1>Support</h1>
                    <div><a href="https://www.patreon.com/posts/living-world-v0-135513057?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"><img src="/imagens/media/patreon.png"/></a></div>
                </div>
                <div className="contact-source">
                    <h1>Source</h1>
                    <div><a href="https://github.com/MaximillianRW/livingworld"><img src="/imagens/media/github.png"/></a></div>
                </div>
            </div>
        </section>
    )
}

export default Contact