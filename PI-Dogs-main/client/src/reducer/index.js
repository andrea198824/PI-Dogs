import { FILTER_TEMPERAMENT,FILTER_RAZA, GET_TEMPERAMENT} from '../actions/index';


const initialState = {
    dogs: [],
    allDogs: [],
    filterTemperaments: [],
    allTemperaments: []
}
export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }

        case FILTER_RAZA:
            const allDogs = state.allDogs
            //const statusFilter = action.payload === ? allDogs : allDogs.filter(c => c.state === action.payload)
            const statusFilter = allDogs.filter(c => c.state === action.payload)
            return {
                ...state,
                dogs: statusFilter
            }
        case FILTER_TEMPERAMENT:
            const allTemperaments = state.temperament
            //const statusTemp = action.payload === 'All' ? allTemperaments : allTemperaments.filter(c => c.state === action.payload)
            const statusTemp = allTemperaments.filter(c => c.temperament === action.payload)
            return {
                ...state,
                temperaments: statusTemp
            }

        default:
            return state;
    }
}
export default rootReducer;