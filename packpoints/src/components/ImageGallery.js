import React, { useState } from 'react'

import './ImageGallery.css'

export const ImageGallery = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: '100%',
        position: 'relative'
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].src})`
    }

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, 300%)',
        left: '18px',
        fontSize: '80px',
        color: '#000',
        zIndex: 1,
        cursor: 'pointer'
    }
    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, 300%)',
        right: '18px',
        fontSize: '80px',
        color: '#000',
        zIndex: 1,
        cursor: 'pointer'
    }

    const goToPrevious = () => {
        const newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const dotsContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        padding: '17px 0 0 0'
    }

    const dotStyles = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '20px'
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}> ← </div>
            <div style={rightArrowStyles} onClick={goToNext}> → </div>
            <div style={slideStyles}></div>
            <div style={dotsContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div style={dotStyles} key={slideIndex} onClick={() => goToSlide(slideIndex)}>⬤</div>
                ))}
            </div>
        </div>
    )
}