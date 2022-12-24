import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './icon'
import {signin, signup} from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password:'', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const switchMode = () => {
        setIsSignUp((isSignUp) => !isSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => { 
        const result = (res ===null ? undefined : res.profileObj); // ?. => if res is null we dont get an error
        const token = (res ===null ? undefined : res.tokenId);
        try {
            dispatch({type:'AUTH', data:{result, token}})

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = () => {
        console.log("Google Sign In failed.");
    };
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Log In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>     
                                </>
                            ) 
                        }
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="comfirmPassword" label="Comfirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>        
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit} >
                        {isSignUp ? 'Sign Up' : "Log In"}
                    </Button>
                    <GoogleLogin
                        clientId='610374859715-ddl36cdjhk44jcc90r6r17k211ulj5hb.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}variant="contained"color="primary">
                            Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </Paper>
    </Container>
  )
}

export default Auth