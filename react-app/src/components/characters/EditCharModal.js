import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { editCore } from "../../store/characters";
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faEdit,
} from '@fortawesome/free-solid-svg-icons';

const Content = styled.div`
    form > div {
        width: 25rem;
        height: 2rem;
    }
`

function EditCharModal({ char, idx, setMounted }) {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(char.name);
    const [race, setRace] = useState(char.race);
    const [charClass, setCharClass] = useState(char.class);
    const [background, setBackground] = useState(char.background);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === char.name
            && race === char.race
            && charClass === char.class
            && background === char.background) {
            setShowModal(false);
            setErrors([]);
            return;
        }
        const formData = {
            charId: char.id,
            name,
            race,
            charClass,
            background
        }
        const data = await dispatch(editCore(formData));
        if (data.errors) {
            setErrors(data.errors);
        }
        else {
            if (idx === 0) {
                setShowModal(false);
                setErrors([])
                // Weird fading conditions probably something to do with disapperance of modal
            }
            else {
                setMounted(false)
            }
            // window.scrollTo(0, 0)
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
            <button type="button" className="roster-edit-btn" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faEdit} /></button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                    setErrors([])
                    setName(char.name);
                    setRace(char.race);
                    setCharClass(char.class);
                    setBackground(char.background);
                }}>
                    <Content className='modal-content'>
                        <h2>To greet the sun anew</h2>
                        <div className="modal-errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div>
                                <label htmlFor="create-name">Edit Name</label>
                                <input type="text" id="create-name" value={name} onChange={updateName} spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-char-class">Edit Class</label>
                                <input type="text" id="create-char-class" value={charClass} onChange={updateClass} spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-race">Edit Race</label>
                                <input type="text" id="create-race" value={race} onChange={updateRace} spellCheck={false} />
                            </div>
                            <div>
                                <label htmlFor="create-background">Edit Background</label>
                                <input type="text" className="create-background" value={background} onChange={updateBackground} spellCheck={false} />
                            </div>
                            <div className="modal-btns">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => {
                                    setShowModal(false);
                                    setErrors([])
                                    setName(char.name);
                                    setRace(char.race);
                                    setCharClass(char.class);
                                    setBackground(char.background);
                                }}>Close</button>
                            </div>
                        </form >
                    </Content>
                </Modal>
            )}
        </>
    );
}

export default EditCharModal;
