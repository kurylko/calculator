import React from "react";
import avocadoSmall from "../images/avocado-small.jpg";
import {HOME_TEXT} from "../components/consts";
import {Button} from "@mui/material";

export default function Home() {
    return (
        <div className="home">
            <h1>Save your favourite food here! </h1>
            <div style={{display: "flex", gap: "20px", marginBottom: "30px"}}>
                <img src={avocadoSmall} alt="Avocado" style={{width: '350px', height: '350px'}}/>
                <div>{HOME_TEXT}</div>
            </div>
            <Button
                variant="outlined" size="medium" href="/food-info"
                style={{width: '170px'}}
                sx={{
                    margin: 'auto',
                    display: 'block'
                }}>Start</Button>
        </div>
    )
}