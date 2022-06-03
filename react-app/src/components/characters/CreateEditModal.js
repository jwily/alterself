import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { createChar, editCore } from "../../store/characters";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChild,
    faEdit
} from '@fortawesome/free-solid-svg-icons';

import UploadPicture from './UploadPicture';
import IconDiv from './IconDiv';

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
        filter: drop-shadow(0px 0px 5px rgba(255, 185, 0, .75));
    }
`

const Content = styled.div`
    form > div {
        width: 25rem;
        height: 2rem;
    }

    .create-body {
        display: flex;
    }

    .char-form-body {
        display: flex;
        flex-direction: column;
    }

    ${props => props.edit ?
        `input {
            width: 15rem;
        }` :
        `
        input {
            width: 17.5rem;
        }
        `
    }
`

const CreateEditModal = ({ edit = false, char = {}, idx, setMounted }) => {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [background, setBackground] = useState('');
    const [img, setImg] = useState(0);

    const [changed, setChanged] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            setName(char.name);
            setRace(char.race);
            setCharClass(char.class);
            setBackground(char.background);
            setImg(char.img ? char.img : 0);
        }
        else {
            setName('');
            setRace('');
            setCharClass('');
            setBackground('');
            setImg(0)
        }
        setErrors([]);
        setStatus(null);
    }, [char.name, char.race, char.img, char.class, char.background, showModal, edit])

    const closeScript = () => {
        setShowModal(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            race,
            charClass,
            background,
            img
        }
        const data = await dispatch(createChar(formData));
        if (data) {
            setErrors(data);
        }
        else {
            closeScript();
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        if (name === char.name
            && race === char.race
            && charClass === char.class
            && background === char.background
            && img === char.img) {
            setShowModal(false);
            return;
        }
        const formData = {
            charId: char.id,
            name,
            race,
            charClass,
            background,
            img
        }
        const data = await dispatch(editCore(formData));
        if (data.errors) {
            setErrors(data.errors);
        }
        else {
            if (idx === 0) {
                setShowModal(false);
                // Weird fading conditions probably something to do with disapperance of modal
            }
            else {
                setMounted(false);
            }
            // window.scrollTo(0, 0)
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        setStatus(null);
    }

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
            {edit ?
                <button type="button" className="roster-edit-btn" onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button> :
                <RosterCreate onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon className="roster-fa" icon={faChild} /> Create
                </RosterCreate>}
            {showModal && (
                <Modal onClose={closeScript}>
                    <Content className='modal-content' edit={edit}>
                        {edit ? <h2>To greet the sun anew</h2> :
                            <h2>The road goes ever on</h2>}
                        <div className="modal-errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        {status !== 'choose' && <div className='create-body'>
                            <IconDiv
                                edit={edit}
                                img={img}
                                char={char}
                                setImg={setImg}
                                name={name}
                                status={status}
                                setStatus={setStatus}
                                setChanged={setChanged}
                                setErrors={setErrors}
                            />
                            <div className="char-form-body">
                                {!status && (edit ?
                                    <form onSubmit={handleEdit} autoComplete="off" id="edit-form">
                                        <div>
                                            <label htmlFor="edit-name">Edit Name</label>
                                            <input type="text" id="edit-name" value={name} onChange={updateName} spellCheck={false} />
                                        </div>
                                        <div>
                                            <label htmlFor="edit-char-class">Edit Class</label>
                                            <input type="text" id="edit-char-class" value={charClass} onChange={updateClass} spellCheck={false} />
                                        </div>
                                        <div>
                                            <label htmlFor="edit-race">Edit Race</label>
                                            <input type="text" id="edit-race" value={race} onChange={updateRace} spellCheck={false} />
                                        </div>
                                        <div>
                                            <label htmlFor="edit-background">Edit Background</label>
                                            <input type="text" className="edit-background" value={background} onChange={updateBackground} spellCheck={false} />
                                        </div>
                                    </form > :
                                    <form onSubmit={handleCreate} autoComplete="off" id="create-form">
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
                                    </form >)}
                                {status === 'upload' &&
                                    <div>
                                        <UploadPicture
                                            charId={char.id}
                                            edit={edit}
                                            setImg={setImg}
                                            changed={changed}
                                            setChanged={setChanged}
                                            setErrors={setErrors} />
                                    </div>}
                                <div className="modal-btns">
                                    {!status ? <button type="submit" form={edit ? "edit-form" : "create-form"}>{edit ? 'Update' : 'Create'}</button> :
                                        <button type="button" onClick={handleBack}>Back to {edit ? 'Update' : 'Create'}</button>}
                                    <button type="button" onClick={closeScript}>Close</button>
                                </div>
                            </div>
                        </div>}
                    </Content>
                </Modal>
            )}
        </>
    );
}

export default CreateEditModal;
