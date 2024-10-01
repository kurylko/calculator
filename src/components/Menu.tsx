import React, {useEffect} from "react";
import {Box, AppBar, Toolbar, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAuth} from "../contexts/authContext/authContext";
import {doSignOut} from "../auth";
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();

    const onLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
            if(userLoggedIn){
                await doSignOut();
                navigate("/");
            }
        }

    return (
        <div className="menu-container">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/">HOME</Button>
                        <Button color="inherit" component={Link} to="/food-info">ADD FOOD</Button>
                        <Button color="inherit" component={Link} to="/my-food">MY FOOD</Button>
                        <Button color="inherit" component={Link} to="/blog">BLOG</Button>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                        {!userLoggedIn &&  <Button color="inherit" component={Link} to="/log-in">LOG IN</Button>}
                        {userLoggedIn && <Button color="inherit" onClick={onLogOut}>LOG OUT</Button>}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}