import React from 'react';
import { filterDogsByRaza } from '../actions'
import { useDispatch, useSelector } from 'react-redux';

function Raza() {

    const dispatch = useDispatch()
    const dogis = useSelector((state) => state.dogs);
   
    const dogsChange = (e) => {
        e.preventDefault();
        dispatch(filterDogsByRaza(e.target.value))
    }
    return (
        <select onChange={e => dogsChange()} >
            <option value={''} >Seleccionar raza</option>
            {dogis.map((el) => (
                <option value={el.name} key = {el.name}>{el.name}</option>
            ))}
        </select>
    )
}

export default Raza;