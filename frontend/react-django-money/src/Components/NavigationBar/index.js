import React from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const navBar = (props) => {
  const { clickMenuBtn, onLogout } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={clickMenuBtn} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Деньги
        </Typography>
        <Button color="inherit" onClick={onLogout} >Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default navBar;
