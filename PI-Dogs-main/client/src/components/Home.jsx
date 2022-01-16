import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDogs,
    orderbyName,
    orderbyWeight,
    filterDogsCreated,
    filterDogTemp,
    getTemperaments,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";



export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const [order, setOrder] = useState('')
    const [orderr, setOrderr] = useState("");//cambiar nombres
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDogs = currentPage * dogsPerPage
    const indexOfFirstDogs = indexOfLastDogs - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs)
    //const [temperamentSelected, setTemperamentSelected] = useState("")

    const paginado = ((pageNumber) => {
        setCurrentPage(pageNumber)
    })

    const allTemp = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments());
      }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterCreated(e) {
        //declaro una función que es un handle del filter del dog creado o de api
        e.preventDefault(); //esta funcion es la que paso en el select y cuando (e) se modifique ejecuta esta función
        dispatch(filterDogsCreated(e.target.value)); //despacho la acción llamada filterDogsCreated y accedo al valor de cada una de las opciones
    } //de value con el e.target.value - dependiendo de cuál clickea el usuario

    function handleFilterByTemp(e) {
        e.preventDefault();
        dispatch(filterDogTemp(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderbyName(e.target.value));
        setCurrentPage(1); //cuando hago el ordenamiento quiero setear la pagina en la primera, en 1
        setOrder(`Ordenado ${e.target.value}`); //pero tambien tengo que tener un estado que me lo setee
    } //a ese estado local modificamelo para que desde el front me haga el ordenamiento

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderbyWeight(e.target.value));
        setCurrentPage(1);
        setOrderr(`Ordenado ${e.target.value}`); //ese estado local empieza vacío y lo seteo de cierta manera para que me haga el renderizado
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
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <select
                    onClick={(e) => handleOrderByName(e)}
                >
                    <option value='Order by Name'>Order by Name</option>
                    <option value='Asc'>From A to Z</option>
                    <option value='Desc'>From Z to A</option>
                </select>
                <select onClick={(e) => handleFilterByTemp(e)}>
                    <option value=''>Filter by Temperament</option>
                    {allTemp.map((temp) => (
                    <option key={temp.id} value={temp.name}>{temp.name}</option>))}
                </select>


                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />

                {
                            currentDogs.map((c) => {
                                return (
                                    <React.Fragment>

                                        <div className='main'>
                                            <div>
                                                <Link to={'/home/' + c.id}>
                                                    <div className='content-icon'>
                                                        <Card name={c.name} image={c.image} weight={c.weight} temperament={c.temperament} key={c.id} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }

            </div>

        </div >
    )
}