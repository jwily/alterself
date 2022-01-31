import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { setTheme } from '../../store/theme';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(setTheme('default'))
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
