import React, { useEffect } from 'react'
import { ImageCard } from './ImageCard'

import feb from '../assets/february_monthly.jpeg'
import './AboutPackPoints.css'

const cardProps = {
    src: [
        { src: feb },
        { src: feb },
        { src: feb },
        { src: feb },
        { src: feb },
        { src: feb },
        { src: feb },
    ],
    alt: 'feb monthly prize'
}

export const AboutPackPoints = () => {
    return (
        <div>
            <h1 className='heading'>Image Gallery</h1>
            <ImageCard {...cardProps} />
        </div>
    )
}