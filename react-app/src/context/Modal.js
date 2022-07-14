import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import BlackBox from '../global/BlackBox';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
`

const ModalContent = styled(BlackBox)`
    position: absolute;
    padding: 1rem;

    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 0 1rem;

        form > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: .5rem;
        }

        textarea {
            resize: none;
        }

        .modal-errors {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: .5rem;
            margin-bottom: 1.5rem;
            color: rgb(236, 52, 35);
        }

        .modal-btns {
            display: flex;
            justify-content: end;
            margin-top: 1.5rem;
            margin-bottom: .5rem;
            margin-left: .5rem;
            margin-right: .5rem;

            button {
                margin-left: .25rem;
            }
        }

        h2 {
            margin: 1rem;
            font-family: 'Cormorant SC', serif;
            font-size: 2.5rem;
        }
    }
`

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <ModalContainer>
            <ModalBackground onClick={onClose} />
            <ModalContent>
                {children}
            </ModalContent>
        </ModalContainer>,
        modalNode
    );
}
