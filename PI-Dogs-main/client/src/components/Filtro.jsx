import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { filterDogs  } from "../../redux/actions";



export default function FilterTemps() {
    const dispatch = useDispatch()
    const temperaments = useSelector((state)=> state.countries)
   
    
 

    function handleFilterTemps(e){
        e.preventDefault();
        dispatch(filterDogs( e.target.value ))
    }

    return(
        <div>
            <select  onChange={handleFilterTemps}>
                <option>seleccionar pais</option>
               {temperaments.map((el)=> 
                <option value ={el.name} >{el.name}</option>
                ) }
            </select>
        </div>
    )
}