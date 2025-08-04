import "./banner.css"
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { widgets } from "src/components";
import { HashLink } from "react-router-hash-link";

const _ = require("lodash");
const ANIMATION_DURATION = 10000; // 10 seconds

const concatCarousel = (firstarray, images) => {
    let carousel = firstarray.concat(_.shuffle([...images])); // Shuffle on first load
    if (carousel[images.length] === carousel[images.length - 1]) {
        let pick = images.length + Math.floor(Math.random() * images.length);
        [carousel[images.length], carousel[pick]] = [carousel[pick], carousel[images.length]];
    }
    return carousel;
}

const Banner = (props) => {
    const [images, setImages] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [carouselImgIndex, setCarouselImgIndex] = useState([null, null]);
    const carouselImgIndexToChangeRef = useRef(1);
    const intervalRef = useRef(null);
    const bannerRef = useRef(null);

    // Efeito para ajustar a altura
    useLayoutEffect(() => {
        if (!props.height || !bannerRef.current) return;

        const validHeight = Math.max(0, Number(props.height));

        // 1. Primeiro força o reset da altura
        bannerRef.current.style.height = null;
        bannerRef.current.style.minHeight = '0px';

        // 2. Força um reflow sincrono
        void bannerRef.current.offsetHeight;

        // 3. Aplica a nova altura
        bannerRef.current.style.height = `${validHeight}px`;

        // 4. Debugging preciso
        requestAnimationFrame(() => {
            console.log('Expected height:', validHeight,
                'Actual height:', bannerRef.current.offsetHeight);
        });
    }, [props.height]);


    useEffect(() => {
        fetch("/imagens/Banner/images.json")
            .then(res => res.json())
            .then(files => setImages(files.map(f => `/imagens/Banner/${f}`)));
    }, []);

    useEffect(() => {
        if (images.length === 0) return;
        setCarouselImgIndex(firstpair => {
            setCarousel(carousel => {
                carousel = concatCarousel(_.shuffle([...images]), images)
                return carousel;
            });
            return firstpair = [0, 1];
        });

        intervalRef.current = setInterval(() => {
            setCarouselImgIndex(prev => {
                let next = [...prev];
                let carouselImgIndexToChange = carouselImgIndexToChangeRef.current;
                next[carouselImgIndexToChange] = (next[carouselImgIndexToChange] + 2) % (2 * images.length); // Increment the index, wrap around at images.length
                if (next[carouselImgIndexToChange] === images.length + 1) {
                    setCarousel(carousel => {
                        carousel = concatCarousel(carousel.splice(images.length), images)
                        return carousel;
                    });
                    next[carouselImgIndexToChange] = 1; // Reset to 0 if it exceeds the length
                    next[(carouselImgIndexToChange + 1) % 2] = 0; // Reset the other index to 0
                }
                return next;
            });

            carouselImgIndexToChangeRef.current = (carouselImgIndexToChangeRef.current + 1) % 2;
        }, ANIMATION_DURATION / 2);

        return () => clearInterval(intervalRef.current);
    }, [images]);

    //const headerHeight = document.getElementById("root").style.getPropertyValue('--headerHeight')

    return (
        <div
            id={props.id}
            ref={bannerRef}
            className={props.className ?? "banner"}
            style={{
                transition: 'height 0.3s ease-out',
                "--banner-animation-duration": `${ANIMATION_DURATION}ms`,
                "--banner-animation-duration2": `${ANIMATION_DURATION / 2}ms`
            }}
        >
            <HashLink to='#About' smooth={true} className="banner-link">
                {carouselImgIndex[0] !== null && images.length > 0 && (
                    <img
                        className="banner-img0"
                        src={carousel[carouselImgIndex[0]]}
                        alt={`Banner ${carousel[carouselImgIndex[0]]}`}
                    />
                )}
                {carouselImgIndex[1] !== null && images.length > 0 && (
                    <img
                        className="banner-img1"
                        src={carousel[carouselImgIndex[1]]}
                        alt={`Banner ${carousel[carouselImgIndex[1]]}`}
                    />
                )}
                <widgets.Logo className='banner-title' imagem='/imagens/Title.png' />
                <widgets.Logo className='banner-subtitle' imagem='/imagens/Subtitlev2-4.png' />
            </HashLink>
        </div>
    );
};

export default Banner;