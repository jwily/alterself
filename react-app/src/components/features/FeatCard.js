import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteFeat } from "../../store/features";
import { editFeat } from "../../store/features";

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

    .edit-feat-form {
        display: flex;
        flex-direction: column;
    }

    .edit-feat-field {
        font-size: 1rem;
        padding: .5rem;
        width: 12.5rem;
    }

    .feat-delete-confirm {
        justify-self: end;
    }

    .feat-reveal {
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

const FeatCard = ({ feat }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [name, setName] = useState(feat.name);
    const [description, setDesc] = useState(feat.description || '');

    const submitEdit = async (e) => {
        e.preventDefault();
        const formData = {
            featId: feat.id,
            name,
            description
        };
        const data = await dispatch(editFeat(formData));
        if (data) {
            console.log("Errors!");
        }
        setShow(false);
    }

    const clickLook = () => {
        setShow(!show);
        setConfirm(false);
        setName(feat.name);
        setDesc(feat.description);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteFeat(id));
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
            <form className="edit-feat-form" id={`edit-feat-${feat.id}`} onSubmit={submitEdit}>
                <div className="title">
                    {!show ? <span className="edit-name-field">{feat.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} />}
                    <div>
                        <button type="button" className="feat-reveal" onClick={clickLook}><FontAwesomeIcon icon={!show ? faSearchPlus : faSearchMinus} /></button>
                    </div>
                </div>
                {show && <textarea value={description} onChange={descChange} rows="5" />}
            </form>
            {
                show && <div className="buttons">
                    {!confirm ?
                        <>
                            <button type="submit" form={`edit-feat-${feat.id}`}>Save</button>
                            <button type='button' onClick={clickDelete}>Delete</button>
                        </> :
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
