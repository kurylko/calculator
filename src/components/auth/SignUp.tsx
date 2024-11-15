import { Navigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../state/userSlice';

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await dispatch(createUser({ email, password }));
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {currentUser && <Navigate to={'/'} replace={true} />}
      <div
        style={{
          marginTop: '20px',
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        Create an account
        <form
          onSubmit={onSubmit}
          style={{
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
          }}
        >
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
            label="password (min 6 characters)"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type={'submit'}
            style={{ width: '50%', alignSelf: 'center' }}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
