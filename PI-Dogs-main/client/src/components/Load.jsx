import React from "react";
import { useEffect } from "react";  
import { useDispatch } from "react-redux"; 
import { getDogs } from '../actions';



export default function ReLoad () {
    const dispatch = useDispatch()
   


    useEffect ((e) => {
        dispatch(getDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs())
    }

    return(
        <div>

            <button onClick = {e=> {handleClick(e)}} >
                Inicio
            </button>
        </div>
    )
}