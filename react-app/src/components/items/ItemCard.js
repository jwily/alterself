import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteItem } from "../../store/items";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle,
    faMinusCircle
} from '@fortawesome/free-solid-svg-icons';

const Card = styled.li`

    .edit-item-form {
        display: flex;
        flex-direction: column;
    }

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

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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

    .edit-name-field {
        font-size: 1rem;
        padding: .5rem;
        width: 12.5rem;
    }

    .edit-quant-field {
        color: gold;
        width: 4rem;
    }

    input.edit-name-field {
        color: gold;
    }

    textarea {
        margin-top: .5rem;
        resize: none;
        color: gold;
    }

    .item-reveal {
        margin-lefT: .5rem;
    }
`

const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [saved, setSaved] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [name, setName] = useState(item.name);
    const [desc, setDesc] = useState(item.description)
    const [quant, setQuant] = useState(item.quantity)

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteItem(id));
    }

    const clickDelete = () => {
        setConfirm(!confirm);
        setSaved(false);
    }

    const nameChange = (e) => {
        setName(e.target.value);
        setSaved(false);
    }

    const quantChange = (e) => {
        setQuant(e.target.value);
        setSaved(false);
    }

    const descChange = (e) => {
        setDesc(e.target.value);
        setSaved(false);
    }

    return (
        <Card>
            <form className="edit-item-form">
                <div className="title">
                    {!show ? <span className="edit-name-field">{item.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} />}
                    <div>
                        <input className="edit-quant-field" value={quant} onChange={quantChange} type="number" />
                        <button type="button" className="item-reveal" onClick={() => {
                            setShow(!show);
                            setConfirm(false);
                            setSaved(false);
                        }}><FontAwesomeIcon icon={!show ? faPlusCircle : faMinusCircle} /></button>
                    </div>
                </div>
                {show && <textarea value={desc} onChange={descChange} rows="5" />}
            </form>
            {
                show && <div className="buttons">
                    {saved && <span>Saved!</span>}
                    {!confirm ? <button type='button' onClick={clickDelete}>Delete</button> :
                        <form onSubmit={(e) => handleDelete(e, item.id)}>
                            <button type='submit'>Confirm Delete</button>
                            <button type='button' onClick={clickDelete}>Cancel</button>
                        </form>}
                </div>
            }
        </Card >
    )
}

export default ItemCard;
