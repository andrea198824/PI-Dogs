import React from "react";

export default function Card({name, image, height, weight }){
    return (
        <div>
            
            <img src = {image} alt='img not found' width = '200px' height ='250px'/>
            <h3>{name}</h3>
            <h4>{height}</h4>
            <h5>{weight}</h5>
        </div>
    );
}

reducer

const initialState ={
    dogs :[]
}
export function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload
    }
    default:
        return state;
    }
}
export default rootReducer;