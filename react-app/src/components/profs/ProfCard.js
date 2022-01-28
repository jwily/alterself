import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteProf } from "../../store/profs";
import { editProf } from "../../store/profs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearchPlus,
    faSearchMinus
} from '@fortawesome/free-solid-svg-icons';

const Card = styled.li`

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-top: .25rem;

        button {
            margin-left: .5rem;
        }

        span {
            display: flex;
            align-items: center;
            font-size: .85rem;
        }
    }

    .edit-prof-form {
        display: flex;
        flex-direction: column;
    }

    .edit-name-field {
        font-size: 1rem;
        padding: .5rem;
        width: 15rem;
    }

    .prof-delete-confirm {
        justify-self: end;
    }

    .prof-reveal {
        margin-left: .5rem;
    }

    input.edit-name-field {
        color: gold;
    }

    p {
        padding: .5rem;
        margin: .5rem 0;
        background-color: rgba(51, 48, 47, 0.25);
        font-size: .85rem;
    }

    span {
        white-space: nowrap;
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
    }

    textarea {
        margin-top: .5rem;
        resize: none;
        color: gold;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const ProfCard = ({ prof }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [name, setName] = useState(prof.name);
    const [description, setDesc] = useState(prof.description || '');

    const submitEdit = async (e) => {
        e.preventDefault();
        const formData = {
            profId: prof.id,
            name: name || prof.name,
            description
        };
        const data = await dispatch(editProf(formData));
        if (data) {
            console.log("Errors!");
        }
        setShow(false);
    }

    const clickLook = () => {
        setShow(!show);
        setConfirm(false);
        setName(prof.name);
        setDesc(prof.description);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteProf(id));
    }

    const clickDelete = () => {
        setConfirm(!confirm);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const descChange = (e) => {
        setDesc(e.target.value);
    }

    return (
        <Card>
            <form className="edit-prof-form" id={`edit-prof-${prof.id}`} onSubmit={submitEdit}>
                <div className="title">
                    {!show ? <span className="edit-name-field">{prof.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} />}
                    <div>
                        <button type="button" className="prof-reveal" onClick={clickLook}><FontAwesomeIcon icon={!show ? faSearchPlus : faSearchMinus} /></button>
                    </div>
                </div>
                {show && <textarea value={description} onChange={descChange} rows="8" />}
            </form>
            {
                show && <div className="buttons">
                    {!confirm ?
                        <>
                            <button type="submit" form={`edit-prof-${prof.id}`}>Update</button>
                            <button type='button' onClick={clickDelete}>Delete</button>
                        </> :
                        <form onSubmit={(e) => handleDelete(e, prof.id)} className='prof-delete-confirm'>
                            <button type='submit'>Confirm Delete</button>
                            <button type='button' onClick={clickDelete}>Cancel</button>
                        </form>}
                </div>
            }
        </Card >
    )
}

export default ProfCard;
