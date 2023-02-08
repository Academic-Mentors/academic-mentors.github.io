import React from 'react'
import { Gallery } from "react-grid-gallery";

import './ImageCard.css'

export const ImageCard = (props) => {

    return (

    <div className='row'>
        {props.src.map((image, index) => (
            <div className='column'>
                <img src={image.src} alt={"image " + index}/>
            </div>
        ))}
    </div>
    )
}