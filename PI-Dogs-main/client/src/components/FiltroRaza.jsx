import React from 'react';
import { filterDogs } from '../actions'
import { useDispatch, useSelector } from 'react-redux';

function Raza() {

    const dispatch = useDispatch()
    const dogis = useSelector((state) => state.dogs);
   
    const dogsChange = (e) => {
        e.preventDefault();
        dispatch(filterDogs(e.target.value))
    }
    return (
        <select onChange={e => dogsChange(e)} >
            <option>Seleccionar raza</option>
            {dogis.map((el) => (
                <option value={el.name}>{el.name}</option>
            ))}
        </select>
    )
}

export default Raza;