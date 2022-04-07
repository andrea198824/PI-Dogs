import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage(){
    return (
        <div className="lpage">
            <h1 className="letra">Bienvenidos a mi biblioteca!!</h1>
            <Link to = '/home'>
                <div className="letra">
                <button > Ingresar </button>
                </div>
            </Link>
        </div>
    )
}