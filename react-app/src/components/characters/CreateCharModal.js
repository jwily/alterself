import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { createChar } from "../../store/characters";
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChild,
} from '@fortawesome/free-solid-svg-icons';

const RosterCreate = styled.button`
    margin-top: 1.5rem;
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

const Content = styled.div`
    form > div {
        width: 22.5rem;
    }
`

function CreateCharModal() {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [background, setBackground] = useState('');
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            race,
            charClass,
            background
        }
        const data = await dispatch(createChar(formData));
        if (data) {
            setErrors(data);
        }
        else {
            setShowModal(false);
            setErrors([])
            setName('');
            setRace('');
            setCharClass('');
            setBackground('');
        }
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateRace = (e) => {
        setRace(e.target.value);
    };

    const updateClass = (e) => {
        setCharClass(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };

    return (
        <>
            <RosterCreate onClick={() => setShowModal(true)}><FontAwesomeIcon className="roster-fa" icon={faChild} /> Create</RosterCreate>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                    setErrors([])
                    setName('');
                    setRace('');
                    setCharClass('');
                    setBackground('');
                }}>
                    <Content className='modal-content'>
                        <h2>The road goes ever on</h2>
                        <div className="modal-errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div>
                                <label htmlFor="create-name">Name</label>
                                <input type="text" id="create-name" value={name} onChange={updateName} placeholder="Samwise" spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-char-class">Class</label>
                                <input type="text" id="create-char-class" value={charClass} onChange={updateClass} placeholder="Paladin" spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-race">Race</label>
                                <input type="text" id="create-race" value={race} onChange={updateRace} placeholder="Halfling" spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-background">Background</label>
                                <input type="text" className="create-background" value={background} onChange={updateBackground} placeholder="Folk Hero" spellCheck={false} />
                            </div>
                            <div className="modal-btns">
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => {
                                    setShowModal(false);
                                    setErrors([])
                                    setName('');
                                    setRace('');
                                    setCharClass('');
                                    setBackground('');
                                }}>Return</button>
                            </div>
                        </form >
                    </Content>
                </Modal>
            )}
        </>
    );
}

export default CreateCharModal;
