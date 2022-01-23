import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
        lastName,
        email,
        password,
      }
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      } else {
        setShowModal(false)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='username'>User Name</label>
        <input
          id='username'
          type='text'
          onChange={updateUsername}
          value={username}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          onChange={updateEmail}
          value={email}
          required
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          onChange={updateFirstName}
          value={firstName}
          required
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          onChange={updateLastName}
          value={lastName}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
      </div>
      <div>
        <label htmlFor='repeat-password'>Repeat Password</label>
        <input
          id='repeat-password'
          type='password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        ></input>
      </div>
      <div>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
