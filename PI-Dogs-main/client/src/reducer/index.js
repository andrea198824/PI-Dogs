
import { FILTER_TEMPERAMENT,
    FILTER_RACE, 
    FILTER_CREATED} from '../actions/index';


const initialState = {
    dogs: [],
    allDogs: [],
    filterTemperaments: [],
    allTemperaments: [],
    detail: [],
    
}
export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                detail: action.payload
            }
        case FILTER_RACE:
            const allDogs = state.allDogs
            //const statusFilter = action.payload === 'Name' ? allDogs : allDogs.filter(c => c.state === action.payload)
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

            case FILTER_CREATED:
                const allDogis = state.allDogs
                //const statusTemp = action.payload === 'All' ? allTemperaments : allTemperaments.filter(c => c.state === action.payload)
                const createdFilter = action.payload === 'created' ? allDogis.filter(c => c.createdInDb) : allDogis.filter(c => !c.createdInDb)
                return {
                    ...state,
                    dogs: action.payload === 'All' ? state.allDogs : createdFilter
                }

        default:
            return state;
    }
}
export default rootReducer;