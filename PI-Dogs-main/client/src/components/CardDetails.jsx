import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";
import './CardDetails.css';


export default function Detail(props) {
  console.log(props);
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDetail(id)); //accedo al id pasandole props a mi componente Detail
  }, [dispatch]);

  const detailDog = useSelector((state) => state.detail); // me traigo el estado detail desde el reducer con useSelector

  return (

    <div className="homecard" >
      <div >
        {detailDog.length > 0 ? (
          <div className="contenedor">
            <h1 className="titulo">{detailDog[0].name} </h1>
            <img className="imagen"
              src={detailDog[0].image}
              alt='Img not found'
            />
            <p>
              {" "}
              Temperamento:{" "}
              {!detailDog[0].createIndb
                ? detailDog[0].temperament + " "
                : detailDog[0].temperaments.map((el) => el.name + " ")}
            </p>
            <p > Peso: {detailDog[0].height} Cm</p>
            <p> Altura: {detailDog[0].weight} Kg </p>
            <p>
              {" "}
              Años de vida:{" "}
              {detailDog[0].createIndb
                ? detailDog[0].life_span + "years"
                : detailDog[0].life_span}{" "}
            </p>
            <div>
              <Link to='/home'>
                <button> Volver </button>
              </Link>
            </div>
          </div>
        ) : (
          <p > Loading...</p>
        )}
      </div>
    </div>
  );
}
