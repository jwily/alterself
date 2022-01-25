import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const LoginForm = () => {
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
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={email}
          onChange={updateEmail}
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
      <div>
        <button type='submit'>Login</button>
      </div>
      <div>
        <button type='button' onClick={demoLogin}>Demo</button>
      </div>
    </form>
  );
};

export default LoginForm;
