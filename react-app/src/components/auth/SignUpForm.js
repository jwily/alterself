import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import styled from 'styled-components';

const Content = styled.div`
  form > div {
    width: 25rem;
  }
`

const SignUpForm = ({ setToggle }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const formData = {
        username,
        firstName,
        email,
        password,
      }
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Content className="modal-content">
      <h2>Sign Up</h2>
      <div className="modal-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <form onSubmit={onSignUp} autoComplete='off'>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>First Name</label>
          <input
            type='text'
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label htmlFor='repeat-password'>Repeat Password</label>
          <input
            id='repeat-password'
            type='password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
        </div>
        <div className="modal-btns">
          <button type='submit'>Submit</button>
          <button type="button" onClick={() => setToggle(true)}>Back to Login</button>
        </div>
      </form>
    </Content>
  );
};

export default SignUpForm;
