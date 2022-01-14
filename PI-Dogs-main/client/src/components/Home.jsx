import './Home.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import Raza from './FiltroRaza';
import ReLoad from './Load';



export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    //const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDogs = currentPage * dogsPerPage
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs)
    //const [temperamentSelected, setTemperamentSelected] = useState("")

    const paginado = ((pageNumber) => {
        setCurrentPage(pageNumber)
    })

    console.log(paginado)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div className='Home'>
            <Link to='/dog'>Añadir raza</Link>
            <h1>Biblioteca perruna</h1>
            <button onClick={e => { handleClick(e) }}>
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
                
                <Raza/>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
                <ReLoad/>
                {currentDogs.map((c) => {
                    return (
                        <React.Fragment>
                            
                            <div className='main'>
                                <div>
                                <Link to={'/home/' + c.id}>
                                    <div className = 'content-icon'><Card name={c.name} image={c.image} key={c.id} /></div>
                                </Link>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}

            </div>

        </div >
    )
}