import './Home.css'
import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs())
    },[])

    function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    }

    return (
        <div className="Home">
            <Link to='/dog'>Añadir raza</Link>
            <h1>xxx</h1>
            <button onClick ={e=> {handleClick(e)}}>
                Volver a cargar todos los perritos
            </button>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                  
    {   allDogs && allDogs.map((c)=>{
        return(
            <fragment>
                <Link to = {'/home/'+c.id}>
               <Card name = {c.name} image = {c.image} temperament = {c.temperament} key = {c.id}/>  
               </Link>  
            </fragment>       
        )
    })}
              
            </div>
            
        </div>
    )
    }