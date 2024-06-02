import React from "react";
import { Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <div className="menu-container">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">HOME</Button>
                        <Button color="inherit" component={Link} to="/food-info">ADD FOOD</Button>
                        <Button color="inherit" component={Link} to="/">BLOG</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
)
}