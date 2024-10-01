import {Navigate} from "react-router-dom";
import {Button, TextField} from '@mui/material';
import React, {useState} from "react";
import {doCreateUserWithEmailAndPassword} from "../../auth";
import {useAuth} from "../../contexts/authContext/authContext";

const SignUp = () => {
    const {userLoggedIn} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage]= useState(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!isSigningIn){
            setIsSigningIn(true);
            await doCreateUserWithEmailAndPassword({email, password});
        }
    }

    return (
        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {userLoggedIn && (<Navigate to={'/'} replace={true}/>)}
            <div style={{marginTop: "20px"}}>Create an account
                <form onSubmit={onSubmit} style={{width: "100%", display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px"}}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <Button variant="contained" type={"submit"}>Sign up</Button>
                </form>
            </div>
        </div>
    )

}

export default SignUp