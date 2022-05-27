import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import UploadPicture from './UploadPicture';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { createChar } from "../../store/characters";

import { deleteImage } from '../../store/images';

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
        height: 2rem;
    }

    .create-body {
        display: flex;
    }
`

const IconHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: .5rem;
    margin-right: 2.5rem;
`

const Icon = styled.div`
    background-color: rgb(80, 80, 80);
    width: 6rem;
    height: 6rem;
    font-size: 2.5rem;
    border-radius: 10rem;
    font-family: 'Cormorant SC', serif;

    margin-top: .5rem;
    margin-bottom: .85rem;
    margin-left: .5rem;
    margin-right: .5rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Portrait = styled.img`
    object-fit: cover;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 10rem;
`

function CreateCharModal() {

    const images = useSelector(state => state.images);

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [background, setBackground] = useState('');
    const [img, setImg] = useState(null);

    const [changed, setChanged] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setErrors([])
    }, [status])

    const closeScript = () => {
        setShowModal(false);
        setErrors([])
        setName('');
        setRace('');
        setCharClass('');
        setBackground('');
        setImg(null);
        setStatus(null);
    };

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
            closeScript();
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (img) {
            const data = await dispatch(deleteImage(img));
            if (data.errors) {
                setErrors(data.errors);
            }
            else {
                setImg(null);
                setChanged(true);
            }
        }
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
            <RosterCreate onClick={() => setShowModal(true)}>
                <FontAwesomeIcon className="roster-fa" icon={faChild} /> Create
            </RosterCreate>
            {showModal && (
                <Modal onClose={closeScript}>
                    <Content className='modal-content'>
                        <h2>The road goes ever on</h2>
                        <div className="modal-errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        {status !== 'choose' && <div className='create-body'>
                            <IconHolder>
                                <Icon>
                                    {img ? <Portrait src={images.entities[img]?.url} alt="new character portrait" /> : name[0]?.toUpperCase()}
                                </Icon>
                                {status !== 'upload' ? <>
                                    <button id="choose-btn"
                                        onClick={() => {
                                            setStatus('choose')
                                        }}
                                        type="button">
                                        Browse
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStatus('upload')
                                        }}
                                        type="button">
                                        Upload
                                    </button>
                                </> :
                                    <>
                                        <form onSubmit={handleDelete}>
                                            <button id="choose-btn"
                                                type="submit">
                                                Clear
                                            </button>
                                        </form>
                                        <button
                                            onClick={() => {
                                                setStatus('')
                                            }}
                                            type="button">
                                            Return
                                        </button>
                                    </>}
                            </IconHolder>
                            {!status && <form onSubmit={handleSubmit} autoComplete="off">
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
                                    <button type="button" onClick={closeScript}>Close</button>
                                </div>
                            </form >}
                            {status === 'upload' &&
                                <div>
                                    <UploadPicture
                                        closeScript={closeScript}
                                        setImg={setImg}
                                        changed={changed}
                                        setChanged={setChanged}
                                        setStatus={setStatus}
                                        setErrors={setErrors} />
                                </div>}
                        </div>}
                    </Content>
                </Modal>
            )
            }
        </>
    );
}

export default CreateCharModal;
