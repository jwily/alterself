import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AuthFormModal from './auth/AuthFormModal';
import { selectUser } from '../store/session';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const NavMain = styled.nav`
  background-color: black;
  // display: flex;

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

  a:hover {
    color: gold;
  }

  font-family: 'Karla', sans-serif;

  button {
    padding: 0;
    font-size: 1rem;
    background-color: transparent;
    font-family: 'Karla', sans-serif;
    border: none;
    color: whitesmoke;
    cursor: pointer;
  }

  button:hover {
    color: gold;
  }

  .nav-right {
    display: flex;

  }
`

const NavBar = () => {

  const user = useSelector(selectUser());

  return (
    <NavMain>
      <ul>
        <li>
          <Link to='/'>
            Alter Self
          </Link>
        </li>
        {!user && <li>
          <AuthFormModal />
        </li>}
        {user && <>
          {/* <li>
            <Link to='/'>
              Campaigns
            </Link>
          </li> */}
          {/* <li>
            <Link to='/roster'>
              Roster
            </Link>
          </li> */}
          <div className="nav-right">
            <li>
              <a href="https://github.com/jwily"><FontAwesomeIcon icon={faGithub} /></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jwily/"><FontAwesomeIcon icon={faLinkedin} /></a>
            </li>
            <li>
              <LogoutButton />
            </li>
          </div>
        </>}
      </ul>
    </NavMain>
  );
}

export default NavBar;
