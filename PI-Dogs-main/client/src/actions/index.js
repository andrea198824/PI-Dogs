import axios from 'axios';
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_RACE = "FILTER_RACE";
export const FILTER_CREATED = "FILTER_CREATED";

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function filterDogs() {
    return ({
        type: 'FILTER_RACE',
        
    })
}

export function filterTemperaments(payload) {
    return ({
        type: 'FILTER_TEMPERAMENT',
        payload
    })
}

export function filterCreated(payload) {
    return ({
        type: 'FILTER_CREATED',
        payload
    })
}

