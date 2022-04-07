import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs"); //aca sucede toda la conexion entre el front y el back
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function dogDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs/${id}`); //aca sucede toda la conexion entre el front y el back
    return dispatch({
      type: "DOG_DETAIL",
      payload: json.data,
    });
  };
}

export function getDogByName(name) {
  return async function (dispatch) {
    try {
      await axios
        .get("http://localhost:3001/dogs/?name=" + name)
        .then((dogs) => {
          dispatch({
            type: 'SEARCH_DOGS',
            payload: dogs.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDogByWeight(weight) {
  return async function (dispatch) {
    try {
      await axios
        .get("http://localhost:3001/dogs/peso/?peso=" + weight)
        .then((dogs) => {
          dispatch({
            type: 'SEARCH_WEIGHT',
            payload: dogs.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}


export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function postDog(payload) {
  //esto me va a devolver la información de los dogs que se agregan por post
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/dog", payload); // uso axios.post para disparar la accion de crear un god
    /* console.log(json)*/ //en esta ruta quiero hacer el post del payload (lo que llega en el front)
    return dispatch({
      type: "POST_DOG",
      payload: json.data,
    });
  };
}

export function filterDogsCreated(payload) {
  //si son creados o son de la api
  console.log(payload);
  return {
    type: "FILTER_DOGS_CREATED",
    payload,
  };
}

export function filterDogTemp(payload) {
  //lo que llega en payload es lo que le mando desde el componente, el value del select
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}

export function orderbyName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderbyWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}