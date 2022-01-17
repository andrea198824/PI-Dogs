import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required";
    } else if (!input.min_height) {
        errors.min_height = "Min height is required";
    } else if (input.min_height <= 0) {
        errors.min_height = "Min height should be greater than zero";
    } else if (!input.max_height) {
        errors.max_height = "Max height is required";
    } else if (input.max_height <= 0) {
        errors.max_height = "Max height should be greater than zero";
    } else if (parseInt(input.min_height) >= parseInt(input.max_height)) {
        errors.max_height = "Max height must be greater than Min height";
    } else if (!input.min_weight) {
        errors.min_weight = "Min weight is required";
    } else if (input.min_weight <= 0) {
        errors.min_weight = "Min weight should be greater than zero";
    } else if (!input.max_weight) {
        errors.max_weight = "Max weight is required";
    } else if (input.max_weight <= 0) {
        errors.max_weight = "Max weight should be greater than zero";
    } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {
        errors.max_weight = "Max weight must be greater than Min weight";
    } else if (!input.life_span) {
        errors.life_span = "Life span is required";
    } else if (input.life_span <= 0) {
        errors.life_span = "Life span should be grater than zero";
    } else if (input.life_span > 20) {
        errors.life_span = "Life span should be smaller than 20";
    } else if (!input.image) {
        errors.image = "Please insert an image URL";
    } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
    ) {
        errors.image = "Please insert a valid image URL";
    }
    return errors;
}

export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    const [temps, setTemps] = useState([]);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(input);
    }
    function handleSelect(e) {
        if (!temps.includes(e.target.value)) {
            if (temps.length > 0) {
                setTemps([...temps, e.target.value]);
            } else {
                setTemps([e.target.value]);
            }
        }
        console.log(e.target.value);
    }
    function handleDelete(e) {
        e.preventDefault();
        setTemps(temps.filter((temp) => temp !== e.target.value));
        console.log(temps);
        console.log(e.target.value);
    }
    function handleSubmit(e) {
        if (
            errors.name !== undefined ||
            errors.min_height !== undefined ||
            errors.max_height !== undefined ||
            errors.min_weight !== undefined ||
            errors.max_weight !== undefined ||
            errors.life_span !== undefined
        ) {
            document.getElementById("DoNotSubmit");
            return alert("Please complete the fields with valid data");
        }
        const addDog = {
            name: input.name,
            height: input.min_height + " - " + input.max_height,
            weight: input.min_weight + " - " + input.max_weight,
            life_span: input.life_span,
            image: input.image,
            temperament: temps,
        };
        e.preventDefault();
        dispatch(postDog(addDog));
        alert("Your dog was successfully created!");
        setInput({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperament: [],
        });
        setTemps([]);
        history.push("/home");
    }
    return (
        <div>
            <div>
                <h1>Create Your Dog!</h1>
                <form
                    id='DoNotSubmit'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div>
                        <label>Nombre: </label>
                        <input
                            key='name'
                            placeholder='Enter a Name'
                            type='text'
                            name='name'
                            value={input.name}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Height: </label>
                        <input
                            onChange={(e) => handleChange(e)}
                            name='min_height'
                            type='min_height'
                            value={input.min_height}
                            placeholder='Min height'
                        />
                        {errors.min_height && (
                            <p>{errors.min_height}</p>
                        )}
                        <input
                            onChange={(e) => handleChange(e)}
                            name='max_height'
                            type='max_height'
                            value={input.max_height}
                            placeholder='Max height'
                        />
                        {errors.max_height && (
                            <p>{errors.max_height}</p>
                        )}
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input
                            onChange={(e) => handleChange(e)}
                            name='min_weight'
                            type='min_weight'
                            value={input.min_weight}
                            placeholder='Min weight'
                        />
                        {errors.min_weight && (
                            <p>{errors.min_weight}</p>
                        )}
                        <input
                            onChange={(e) => handleChange(e)}
                            name='max_weight'
                            type='max_weight'
                            value={input.max_weight}
                            placeholder='Max weight'
                        />
                        {errors.max_weight && (
                            <p>{errors.max_weight}</p>
                        )}
                    </div>
                    <div>
                        {" "}
                        <label>Life Span: </label>
                        <input
                            placeholder='Life Span'
                            type='text'
                            name='life_span'
                            value={input.life_span}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.life_span && (
                            <p>{errors.life_span}</p>
                        )}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input
                            key='image'
                            placeholder='Insert URL image'
                            type='text'
                            name='image'
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <div>
                        {" "}
                        <label>Choose Temperaments: </label>
                        <select
                            name='temperament'
                            onChange={(e) => handleSelect(e)}
                            type='text'
                        >
                            <option value={null}></option>
                            {temperaments.map((temp, id) => {

                                return (
                                    <option key={id} value={temp.name}>
                                        {temp.name}
                                    </option>
                                );
                            })}
                        </select>
                        {temps.map((temp, id) => {

                            return (
                                <React.Fragment key={id}>
                                    <div>
                                        {temp}
                                        <button
                                            value={temp}
                                            onClick={(e) => handleDelete(e)}
                                        >
                                            x
                                        </button>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div>
                        <button type='submit' name='submit'>
                            Create Dog
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Link to='/home'>
                    <button >Back </button>
                </Link>
            </div>
        </div>
    );
}