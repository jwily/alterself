
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavMain = styled.nav`
  background-color: black;
  display: flex;
  a {
    color: white;
    text-decoration: none;
  }
  ul {
    display: flex;
    width: 100%;
    height: 2.5rem;
    justify-content: space-around;
    align-items: center;
  }
`

const NavBar = () => {
  return (
    <NavMain>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </NavMain>
  );
}

export default NavBar;
