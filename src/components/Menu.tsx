import React from 'react';
import { Box, AppBar, Toolbar, Button, Avatar } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/authContext';
import { doSignOut } from '../auth';
import { useNavigate } from 'react-router-dom';
import avatar from './../assets/images/avocado-face.png';

export default function Menu() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const onLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userLoggedIn) {
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
              {!userLoggedIn && (
                <Box sx={{ display: 'flex' }}>
                  <Avatar>
                    <PersonOutlineIcon />
                  </Avatar>
                  <Button color="inherit" component={Link} to="/log-in">
                    LOG IN
                  </Button>
                </Box>
              )}
              {userLoggedIn && (
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
