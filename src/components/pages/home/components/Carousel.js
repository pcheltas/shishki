import React, {useState} from "react";
// import SimpleImageSlider from "react-simple-image-slider";
import "../../../../styles/carousel.css"
import image1 from "../../../../images/carousel_1.jpg"
import image2 from "../../../../images/carousel_2.png"

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        { image: image1},
        { image: image2}
    ]

    const goToPrev = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <div className="carousel-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.image}
                        alt={`Slide ${index + 1}`}
                        className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="prev" onClick={goToPrev}>❮</button>
            <button className="next" onClick={goToNext}>❯</button>
            <div className="indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
        // <div>
        //     <SimpleImageSlider width={896} height={504} images={images} showNavs={true} showBullets={true}/>
        // </div>
    );
};

export default Carousel;