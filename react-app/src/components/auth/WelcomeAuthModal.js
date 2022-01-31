import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

const AuthButton = styled.button`
    margin-top: 2rem;
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    color: whitesmoke;
    cursor: pointer;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    font-family: 'Cormorant SC', serif;

    transition: filter .15s;

    &:hover {
        filter: drop-shadow(0px 0px 5px rgba(255, 215, 0, .75));
    }
`

function WelcomeAuthModal() {
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <AuthButton onClick={() => setShowModal(true)}>Get Started</AuthButton>
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
