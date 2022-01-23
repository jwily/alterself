import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
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
          required={true}
        ></input>
      </div>
      <div>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
