import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../actions";
import { useParams } from "react-router-dom";


export default function Detail(props) {
  console.log(props);
  const {id} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(dogDetail(id)); //accedo al id pasandole props a mi componente Detail
  }, [dispatch]);

  const detailDog = useSelector((state) => state.detail); // me traigo el estado detail desde el reducer con useSelector

  return (
    <div>
      <div>
        {detailDog.length > 0 ? (
          <div>
            <h1>{detailDog[0].name} </h1>
            <img
              src={detailDog[0].image}
              alt='Img not found'
            />
            <p>
              {" "}
              Temperaments:{" "}
              {!detailDog[0].createIndb
                ? detailDog[0].temperament + " "
                : detailDog[0].temperaments.map((el) => el.name + " ")}
            </p>
            <p > Height: {detailDog[0].height} Cm</p>
            <p> Weight: {detailDog[0].weight} Kg </p>
            <p>
              {" "}
              Life span:{" "}
              {detailDog[0].createIndb
                ? detailDog[0].life_span + "years"
                : detailDog[0].life_span}{" "}
            </p>
          </div>
        ) : (
          <p > Loading...</p>
        )}
      </div>
      <div>
        <Link to='/home'>
        <button> Back </button>
        </Link>
      </div>
    </div>
  );
}
