import React from "react";
import { Link } from "react-router-dom";
import './Card.css';

export default function Card({name, image, temperament, weight}){
    return (
        <div className="caja">                
            <p >{name}</p>
            <img
            src={image}
            alt='Image not found'
            width='240px'
            height='180px'
          />
            <div className="temp">
            <h6>Temperamento: {temperament}</h6>
            </div>
            <h6>{weight}(kg)</h6>
            <br/>

        </div>
    );
}
