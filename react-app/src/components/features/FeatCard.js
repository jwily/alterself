import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteFeat } from "../../store/features";
import { editFeat } from "../../store/features";
import { updateChar, delCharFeat } from "../../store/characters";

import { setErrors } from "../../store/help";
import SavedMessage from "../../global/SavedMessage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearchPlus,
    faSearchMinus
} from '@fortawesome/free-solid-svg-icons';

const Card = styled.li`

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: .25rem;

        button {
            margin-left: .25rem;
        }
    }

    .edit-feat-form {
        display: flex;
        flex-direction: column;
    }

    .edit-name-field {
        font-size: 1rem;
        padding: .5rem;
        width: 15rem;
    }

    .feat-delete-confirm {
        justify-self: end;
    }

    .feat-reveal {
        margin-left: .5rem;
    }

    input.edit-name-field {
        color: #ffcd00;
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
        text-overflow: ellipsis;
    }

    textarea {
        margin-top: .5rem;
        resize: none;
        color: #ffcd00;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

const FeatCard = ({ feat }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [saved, setSaved] = useState(false);

    const [name, setName] = useState(feat.name);
    const [description, setDesc] = useState(feat.description);

    const submitEdit = async (e) => {
        e.preventDefault();
        if (saved) return;
        const formData = {
            featId: feat.id,
            name,
            description
        };
        const data = await dispatch(editFeat(formData));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        } else {
            setSaved(true);
            dispatch(updateChar(data))
        }
    }

    const clickLook = () => {
        setShow(!show);
        setConfirm(false);
        setName(feat.name);
        setDesc(feat.description);
        setSaved(false);
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        const data = await dispatch(deleteFeat(id));
        if (data.errors) {
            dispatch(setErrors(data.errors));
        } else {
            dispatch(delCharFeat(data))
        }
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
            <form className="edit-feat-form" id={`edit-feat-${feat.id}`} onSubmit={submitEdit} autoComplete="off">
                <div className="title">
                    {!show ? <span className="edit-name-field">{feat.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} />}
                    <div>
                        <button type="button" className="feat-reveal" onClick={clickLook}><FontAwesomeIcon icon={!show ? faSearchPlus : faSearchMinus} /></button>
                    </div>
                </div>
                {show && <textarea value={description} onChange={descChange} rows="8" />}
            </form>
            {
                show && <div className="buttons">
                    {saved ? <SavedMessage setSaved={setSaved} /> : <span></span>}
                    {!confirm ?
                        <div>
                            <button type="submit" form={`edit-feat-${feat.id}`}>Update</button>
                            <button type='button' onClick={clickDelete}>Delete</button>
                        </div> :
                        <form onSubmit={(e) => handleDelete(e, feat.id)} className='feat-delete-confirm'>
                            <button type='submit'>Confirm Delete</button>
                            <button type='button' onClick={clickDelete}>Cancel</button>
                        </form>}
                </div>
            }
        </Card >
    )
}

export default FeatCard;
