import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage(){
    return (
        <div className="lpage">
            <h1>Bienvenidos</h1>
            <Link to = '/home'>
                <button> Ingresar </button>
            </Link>
        </div>
    )
}