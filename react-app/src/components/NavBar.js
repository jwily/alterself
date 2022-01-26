
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AuthFormModal from './auth/AuthFormModal';
import { selectUser } from '../store/session';
import { useSelector } from 'react-redux';

const NavMain = styled.nav`
  background-color: black;
  display: flex;
  ul {
    display: flex;
    width: 100%;
    height: 2.5rem;
    justify-content: space-between;
    align-items: center;
  }

  li {
    margin: 0 1rem;
  }

  font-family: 'Karla', sans-serif;
`

const NavBar = () => {

  const user = useSelector(selectUser());

  return (
    <NavMain>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Alter Self
          </NavLink>
        </li>
        {!user && <li>
          <AuthFormModal />
        </li>}
        {user && <>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink to='/roster' exact={true} activeClassName='active'>
              Roster
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </>}
      </ul>
    </NavMain>
  );
}

export default NavBar;
