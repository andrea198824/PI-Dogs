import React from "react";
import './Paginado.css';


export default function Paginado ({allDogs,paginado,dogsPerPage}){
    const pageNumbers = []
    
    for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage)-1 ; i++) {
        pageNumbers.push(i + 1)    
    }
    // console.log(pageNumbers)
    // console.log(characterPerPage)
    return(
        <nav>
          <ul className='pagination' >
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li className='number' key={number} >
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}