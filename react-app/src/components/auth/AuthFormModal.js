import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function AuthFormModal() {
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(true);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
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

export default AuthFormModal;
