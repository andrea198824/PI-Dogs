const initialState = {
    dogs: [],
    allDogs: [], //hago una copia del estado que siempre tenga todos los dogs para que me haga los filtros sobre todo y no sobre el estado que ya filtré
    orderDogs: [], //de esta manera no tengo que volver a cargar a todos los perros
    weightDogs: [],
    temperaments: [], //declaro un nuevo estado temperament donde guardo los temperamentos
    detail: [], //creo un nuevo estado detail para guardar la info del detalle del perro
};


export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "DOG_DETAIL": //al hacer click sobre un perro accedo a sus detalles
            return {
                ...state,
                detail: action.payload, // a detail que es el estado que está creado arriba, pasale action.payload
            };
        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                dogs: action.payload, //lo renderizo en el array dogs, este es el filtrado de buscar por nombre que hice en el back
            };
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload,
            };
        case "POST_DOG": //post dog tiene que estar en el reducer pero no hace nada, porque yo creo un dog en una ruta nueva
            return {
                ...state,
            };
        case "FILTER_DOGS_CREATED": //si el valor de mi acción es created, traigo todos aquellos creados en la DB
            const dogsFiltered =
                action.payload === "Created"
                    ? state.allDogs.filter((dog) => dog.createdInDb) //primero siempre filtro el arreglo que tiene todo
                    : state.allDogs.filter((dog) => !dog.createdInDb);
            return {
                //retorno el estado, y si mi acción vale All traigo los de la api y los filtrados
                ...state,
                dogs: action.payload === "All" ? state.allDogs : dogsFiltered, //si tiene todo devolveme todo y si no devolvéme todos los dogs filtrados
            };
        case "FILTER_BY_TEMP":
            const allDogs = state.allDogs;
            const filteredDogs = allDogs.filter(
                (el) => el.temperament?.includes(action.payload) // action.payload es el temperamento que seleccioné en el filtro de temperamentos que está en el state temperaments y lo que me devuelve es un array de strings con los temperamentos.
            );
            return {
                ...state,
                dogs: filteredDogs,
            };
        /*el valor del select es lo que va a ser el (e.target.value) y va a llegar a la acción por payload
              includes xque cada perro puede tener varios temperamentos
              y si no, devolveme todos los dogs filtrados
              y en dogs le devuelvo la constante filteredDogs; cuando vuelvo a hacer otro filtro, agarra el que tiene todos (allDogs)
              pero el que va a modificar va a hacer el estado de dogs*/
        case "ORDER_BY_NAME":
            const orderDogs =
                action.payload === "Asc" //Si el valor es "Asc"
                    ? state.dogs.sort(function (a, b) {
                        //sort compara dos valores, accedemos al name y los compara, y los coloca a
                        if (a.name > b.name) return 1; //la derecha o a la izquierda, antes o despu{es en el arreglo dependiendo si son mas grandes o mas chicos
                        if (b.name > a.name) return -1;
                        return 0; //si son iguales los deja como está
                    }) // y si no, (si es no es Asc es Des) ordeno de Z a A
                    : state.dogs.sort(function (a, b) {
                        if (a.name > b.name) return -1;
                        if (b.name > a.name) return 1;
                        return 0;
                    });
            return {
                ...state,
                dogs: orderDogs,
            };
        case "ORDER_BY_WEIGHT":
            const weightDogs =
                action.payload === "Weight 1"
                    ? state.dogs.sort(function (a, b) {
                        if (typeof action.payload.weight === "string") {
                            //si recibo un string con el peso
                            if (a.weight > b.weight) return 1; //accedo al valor weight que quiero comparar
                            if (a.weight < b.weight) return -1;
                            return 0; //si son iguales no hace nada, los deja igual
                        } else {
                            // lo convierto en número
                            if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                            if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                            return 0;
                        }
                    }) //si el valor no es 'weight 1'
                    : state.dogs.sort(function (a, b) {
                        //ordeno de mayor a menor
                        if (typeof action.payload.weight === "string") {
                            if (a.weight > b.weight) return -1;
                            if (a.weight < b.weight) return 1;
                            return 0;
                        } else {
                            if (parseInt(a.weight) > parseInt(b.weight)) return -1;
                            if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                            return 0;
                        }
                    });
            return {
                ...state,
                dogs: weightDogs,
            };
        default:
            return state;
    }
}

export default rootReducer;