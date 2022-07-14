import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDungeon
} from '@fortawesome/free-solid-svg-icons';

const AuthButton = styled.button`
    // margin-top: 2rem;
    margin-bottom: 1rem;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    color: whitesmoke;
    cursor: pointer;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    font-family: 'Cormorant SC', serif;

    transition: filter .15s;

    &:hover {
        filter: drop-shadow(0px 0px 5px rgba(255, 185, 0, .75));
    }

    .fa {
        margin-right: .75rem;
    }
`

function WelcomeAuthModal() {
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(true);

    return (
        <>
            <AuthButton onClick={() => setShowModal(true)}>
                <FontAwesomeIcon className="fa" icon={faDungeon} />Get Started</AuthButton>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                    setToggle(true);
                }}>
                    {toggle ?
                        <LoginForm setToggle={setToggle} /> :
                        <SignUpForm setToggle={setToggle} />}
                </Modal>
            )}
        </>
    );
}

export default WelcomeAuthModal;
