import React from 'react';
import { Box, AppBar, Toolbar, Button, Avatar } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { doSignOut } from '../auth';
import { useNavigate } from 'react-router-dom';
import avatar from './../assets/images/avocado-face.png';
import {useSelector} from "react-redux";
import {RootState} from "../state/store";

export default function Menu() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);


  const onLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentUser) {
      await doSignOut();
      navigate('/');
    }
  };

  return (
    <Box className="menu-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                HOME
              </Button>
              <Button color="inherit" component={Link} to="/food-info">
                ADD FOOD
              </Button>
              <Button color="inherit" component={Link} to="/my-food">
                MY FOOD
              </Button>
              <Button color="inherit" component={Link} to="/my-plate">
                MY PLATE
              </Button>
              <Button color="inherit" component={Link} to="/blog">
                BLOG
              </Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
              {!currentUser && (
                <Box sx={{ display: 'flex' }}>
                  <Avatar>
                    <PersonOutlineIcon />
                  </Avatar>
                  <Button color="inherit" component={Link} to="/log-in">
                    LOG IN
                  </Button>
                </Box>
              )}
              {currentUser && (
                <Box sx={{ display: 'flex' }}>
                  <Avatar src={avatar} />
                  <Button color="inherit" onClick={onLogOut}>
                    LOG OUT
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
