import React from "react";
import './Card.css';

export default function Card({name, image, height_min, height_max, weight_min, weight_max, temperament }){
    return (
        <div className='card.container'>                
            <p className='titulo-card' >{name}</p>
            <img className = 'imagen' src = {image.url} alt='img not found' width = '200px' height ='250px'/>
            <p>Temperamento: {temperament}</p>
            <h6>{weight_min}-{weight_max}kg</h6>
            <h6>{height_min}-{height_max} </h6>
            <br/>
        </div>
    );
}
