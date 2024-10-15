import React from "react";
import avocadoSmall from "../assets/images/avocado-small.jpg";
import {HOME_TEXT} from "../components/consts";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <Box className="home">
            <Box
                className="home-title-block"
                sx={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px",
                    marginTop: "20px",
                    width: "90%",
                    alignSelf: "center"
                }}
            >
                <Box component="img"
                     src={avocadoSmall}
                     alt="Avocado"
                     sx={{
                         width: "350px",
                         height: "350px",
                         borderRadius: "50%",
                         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                     }}
                />
                <Box sx={{width: "100%", maxWidth: 700}}>
                    <Typography variant="h1" gutterBottom>
                        Save your favourite food here!
                    </Typography>
                </Box>
            </Box>
            <Box
                className="home-button-block"
                sx={{display: "flex", flexDirection: "column", gap: "20px", marginBottom: "30px", alignItems: "center"}}
            >
                <Typography
                    variant="body1"
                    gutterBottom
                    style={{width: "80%", marginTop: "50px"}}
                >
                    {HOME_TEXT}
                </Typography>
                <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    to="/food-info"
                    style={{width: "170px"}}
                    sx={{
                        margin: "auto",
                        display: "block",
                    }}
                >
                    Start
                </Button>
            </Box>
        </Box>
    );
}
