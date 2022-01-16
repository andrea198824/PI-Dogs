import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); //lo que está tipeando el usuario va a ser mi estado local name

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value); //el value del input que ingresa por búsqueda va a setear el value del state
    /* console.log(name) */
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsByName(name)); //acá lo que tipea el usuario le llega desde el estado local a la función que llama al back con ese name
    setName(""); //para que cuando ya se hizo la busqueda no me siga mostrando el nombre ingresado, seteo el nombre en comillas
  }

  return (
    <div /* className={styles.SearchBar} */>
      <input
        
        type='text'
        value={name}
        placeholder='Look for a breed dog...'
        onChange={(e) => handleInput(e)}
      />
      <button
        
        type='submit'
        onClick={(e) => handleSubmit(e)}
      >
        {" "}
        Search
      </button>
    </div>
  );
}