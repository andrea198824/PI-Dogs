import axios from 'axios';
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_RAZA = "FILTER_RAZA";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";

export function getDogs(){
    return async function(dispatch){
        var json=await axios.get('http://localhost:3001/dogs');
    return dispatch({
        type: 'GET_DOGS',
        payload: json.data
    })
}
}

export function getTemperaments(){
    return async function(dispatch){
        var json=await axios.get('http://localhost:3001/temperaments');
    return dispatch({
        type: 'GET_TEMPERAMENT',
        payload: json.data
    })
}
}

export function filterDogsByRaza(payload){
        return ({
            type: 'FILTER_RAZA',
            payload
        })
    }

    export function filterTemperaments(payload){
        return ({
            type: 'FILTER_TEMPERAMENT',
            payload
        })
    }
