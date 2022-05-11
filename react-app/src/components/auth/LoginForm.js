import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

import styled from 'styled-components';

const Content = styled.div`
  form > div {
    width: 21.5rem;
  }

  span {
    font-size: .85rem;
`

const LoginForm = ({ setToggle }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@alterself.com', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Content className='modal-content'>
      <h2>Log In</h2>
      <div className="modal-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <form onSubmit={onLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            value={email}
            onChange={updateEmail}
            spellCheck={false}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="modal-btns">
          <button type='submit'>Submit</button>
          <button type="button" onClick={() => setToggle(false)}>Sign Up</button>
        </div>
        <div>
          <span>Just want to explore?</span>
          <button type='button' onClick={demoLogin}>Demo Login</button>
        </div>
      </form>
    </Content>
  );
};

export default LoginForm;
