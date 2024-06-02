import React from "react";
import avocadoSmall from "../images/avocado-small.jpg";
import {HOME_TEXT} from "../components/consts";
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
    return (
        <div className="home">
            <div style={{display: "flex", gap: "20px", marginBottom: "30px", marginTop: "20px"}}>
                <img src={avocadoSmall} alt="Avocado" style={{
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                }}/>
                <Box sx={{width: '100%', maxWidth: 700}}>
                    <Typography variant="h1" gutterBottom>
                        Save your favourite food here!
                    </Typography>
                </Box>
            </div>
            <div style={{display: "flex", gap: "20px", marginBottom: "30px"}}>
                <Typography variant="body1" gutterBottom style={{width: "80%", marginTop: "50px"}}>
                    {HOME_TEXT}
                </Typography>
                <Button
                    variant="contained" size="medium" href="/food-info"
                    style={{width: '170px'}}
                    sx={{
                        margin: 'auto',
                        display: 'block'
                    }}>Start</Button>
            </div>
        </div>
    )
}