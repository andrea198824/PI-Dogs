import React from "react";

export default function Card({name, image, height, weight }){
    return (
        <div>
            
            <img src = {image.url} alt='img not found' width = '200px' height ='250px'/>
            <h3>{name}</h3>
            <h4>{height}</h4>
            <h5>{weight}</h5>
        </div>
    );
}
