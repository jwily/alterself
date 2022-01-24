import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function AuthFormModal() {
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        return () => {
            setShowModal(false);
        }
    }, [])

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                    setToggle(true);
                }}>
                    <button type='button' onClick={() => setToggle(!toggle)}>
                        {toggle ? 'Register' : 'Back to Login'}
                    </button>
                    {toggle ?
                        <LoginForm setShowModal={setShowModal} /> :
                        <SignUpForm setShowModal={setShowModal} />}
                </Modal>
            )}
        </>
    );
}

export default AuthFormModal;
