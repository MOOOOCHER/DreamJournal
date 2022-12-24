import React, { useState, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar,Button} from '@material-ui/core';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useStyles from './styles'
import journal from '../../images/journal.jpg';
import { useDispatch } from "react-redux";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () =>{
        dispatch({type: 'LOGOUT'})
        navigate('/');
        setUser(null);
        window.location.reload(false);
    };
    useEffect(() => {
        const token = (user===null ? undefined : user.token)
        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Your Dream Journal</Typography>
                <img className={classes.image} src={journal} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                )}
            </Toolbar>
        </AppBar>
  );
};

export default Navbar;