import React from "react";
import avocadoSmall from "../images/avocado-small.jpg";
import {HOME_TEXT} from "../components/consts";

export default function Home() {
    return (
        <div className="home">
            <h1 className="home-page">Save your favourite food here! </h1>
            <div style={{display:"flex", gap: "20px"}}>
                <img src={avocadoSmall} alt="Avocado" style={{width: '350px', height: '350px'}}/>
                <div>{HOME_TEXT}</div>
            </div>
        </div>
    )
}