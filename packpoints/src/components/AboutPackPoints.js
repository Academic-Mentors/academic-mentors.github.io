import React, { useEffect } from 'react'
import { ImageCard } from './ImageCard'
import { ImageGallery } from './ImageGallery'

import feb from '../assets/february_monthly.jpeg'
import pack_points from '../assets/pack_points.jpg'
import pp_info from '../assets/pp_info.jpg'
import pp_prizes from '../assets/pp_prizes.jpg'
import pp_tiers from '../assets/pp_tiers.jpg'


import './AboutPackPoints.css'

const cardProps = {
    src: [
        { src: feb },
        { src: pack_points },
        { src: pp_info },
        { src: pp_prizes },
        { src: pp_tiers },
    ],
    alt: 'feb monthly prize'
}

const slides = [
    { src: feb, title: 'Feburary Monthly Prizes' },
    { src: pack_points, title: 'Pack Points General Info' },
    { src: pp_info, title: 'Pack Points New Info' },
    { src: pp_prizes, title: 'Pack Points Prizes' },
    { src: pp_tiers, title: 'Pack Points Tiers' },
]

export const AboutPackPoints = () => {

    const containerStyles = {
        width: '540px', 
        height: '700px',
        margin: "0 auto"
    }

    return (
        <div>
            <h1 className='heading'>Image Gallery</h1>
            {/* <ImageCard {...cardProps} /> */}
            <div style={containerStyles}>
                <ImageGallery slides={slides} />
            </div>
        </div>
    )
}