import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { createChar } from "../../store/characters";
import styled from 'styled-components';

const CreateForm = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;

    div {
        width: 22.5rem;
        display: flex;
        justify-content: space-between;
        margin: .5rem;
    }

    input {
        width: 15rem;
    }

    textarea {
        resize: none;
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
            <button onClick={() => setShowModal(true)}>Create</button>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false);
                }}>
                    <CreateForm>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor="create-name">Name</label>
                                <input type="text" id="create-name" required maxLength="255" value={name} onChange={updateName} />
                            </div>
                            <div>
                                <label htmlFor="create-race">Race</label>
                                <input type="text" id="create-race" required maxLength="40" value={race} onChange={updateRace} />
                            </div>
                            <div>
                                <label htmlFor="create-char-class">Class</label>
                                <input type="text" id="create-char-class" required maxLength="40" value={charClass} onChange={updateClass} />
                            </div>
                            <div>
                                <label htmlFor="create-background">Background</label>
                                <input type="text" id="create-background" required maxLength="40" value={background} onChange={updateBackground} />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form >
                    </CreateForm>
                </Modal>
            )}
        </>
    );
}

export default CreateCharModal;
