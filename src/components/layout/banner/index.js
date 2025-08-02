import "./banner.css"
import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { widgets } from "src/components";

const _ = require("lodash");
const ANIMATION_DURATION = 10000; // 10 seconds

const concatCarousel = (firstarray,images) => {
    let carousel = firstarray.concat(_.shuffle([...images])); // Shuffle on first load
    if (carousel[images.length] === carousel[images.length - 1]) {
        let pick = images.length + Math.floor(Math.random() * images.length);
        [carousel[images.length], carousel[pick]] = [carousel[pick], carousel[images.length]];
    }
    return carousel;
}

const Banner = () => {
    const [images, setImages] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [carouselImgIndex, setCarouselImgIndex] = useState([null,null]);
    const carouselImgIndexToChangeRef = useRef(1);
    const carouselImgKeys = useRef([0, 1]);
    const intervalRef = useRef(null);

    useEffect(() => {
        fetch("/imagens/Banner/images.json")
            .then(res => res.json())
            .then(files => setImages(files.map(f => `/imagens/Banner/${f}`)));
    }, []);

    useEffect(() => {
        if (images.length === 0) return;
        setCarouselImgIndex(firstpair => {
            setCarousel( carousel => {
                carousel = concatCarousel(_.shuffle([...images]), images)
                return carousel;
            });
            return firstpair = [0, 1];
        });

        intervalRef.current = setInterval(() => {
            setCarouselImgIndex(prev => {
                /*let next = prev.map((_, index) => {
                    if (index === carouselImgIndexToChange) {
                        prev[index] = (prev[index] + 1) % 2*images.length; // Increment the index
                    }
                    return prev;*/
                let next = [...prev];
                let carouselImgIndexToChange = carouselImgIndexToChangeRef.current;
                next[carouselImgIndexToChange] = (next[carouselImgIndexToChange] + 2) % (2*images.length); // Increment the index, wrap around at images.length
                if (next[carouselImgIndexToChange] === images.length + 1) {
                    setCarousel( carousel => {
                        carousel = concatCarousel(carousel.splice(images.length), images)
                        return carousel;
                    });
                    next[carouselImgIndexToChange] = 1; // Reset to 0 if it exceeds the length
                    next[(carouselImgIndexToChange + 1) % 2] = 0; // Reset the other index to 0
                }
                return next;
            });
            
            carouselImgIndexToChangeRef.current = (carouselImgIndexToChangeRef.current + 1) % 2;
        }, ANIMATION_DURATION/2);

        return () => clearInterval(intervalRef.current);
    }, [images]);

    return (
        <Link
            to="about"
            smooth={true}
            duration={1500}
            className="Banner"
            style={{ "--banner-animation-duration": `${ANIMATION_DURATION}ms`,
                "--banner-animation-duration2": `${ANIMATION_DURATION/2}ms` }}
        >
            {carouselImgIndex[0] !== null && images.length > 0 && (
                    <img
                        className="Banner-img0"
                        src={carousel[carouselImgIndex[0]]}
                        alt={`Banner ${carousel[carouselImgIndex[0]]}`}
                    />
            )}
            {carouselImgIndex[1] !== null && images.length > 0 && (
                    <img className="Banner-img1"
                        src={carousel[carouselImgIndex[1]]}
                        alt={`Banner ${carousel[carouselImgIndex[1]]}`}
                    />
            )}
        <widgets.Logo className='Banner-title' imagem='/imagens/Title.png'/>
        {/*<widgets.Subtitle />*/}
        <widgets.Logo className='Banner-subtitle' imagem='/imagens/Subtitlev2-4.png'/>
        </Link>
    );
};

export default Banner;