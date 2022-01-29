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
    font-family: 'Cormorant', serif;

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
        setShowModal(false);
        setName('');
        setRace('');
        setCharClass('');
        setBackground('');
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
                }}>
                    <Content className='modal-content'>
                        <h2>The road goes ever on</h2>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor="create-name">Name</label>
                                <input type="text" id="create-name" required maxLength="255" value={name} onChange={updateName} placeholder="Samwise" />
                            </div>
                            <div>
                                <label htmlFor="create-race">Race</label>
                                <input type="text" id="create-race" required maxLength="40" value={race} onChange={updateRace} placeholder="Halfling" />
                            </div>
                            <div>
                                <label htmlFor="create-char-class">Class</label>
                                <input type="text" id="create-char-class" required maxLength="40" value={charClass} onChange={updateClass} placeholder="Paladin" />
                            </div>
                            <div>
                                <label htmlFor="create-background">Background</label>
                                <input type="text" className="create-background" required maxLength="40" value={background} onChange={updateBackground} placeholder="Folk Hero" />
                            </div>
                            <div className="modal-btns">
                                <button type="submit">Create</button>
                                <button type="button" onClick={() => setShowModal(false)}>Return</button>
                            </div>
                        </form >
                    </Content>
                </Modal>
            )}
        </>
    );
}

export default CreateCharModal;
