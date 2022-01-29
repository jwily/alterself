import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import debounce from "lodash/debounce"

import { deleteItem } from "../../store/items";
import { editItem } from "../../store/items";
import { editQuantity } from "../../store/items";

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
            margin-left: .25rem;
        }

        span {
            display: flex;
            align-items: center;
            font-size: .85rem;
        }
    }

    .edit-item-form {
        display: flex;
        flex-direction: column;
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

    .item-delete-confirm {
        justify-self: end;
    }

    .item-reveal {
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

const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [changed, setChanged] = useState(false);

    const [name, setName] = useState(item.name);
    const [description, setDesc] = useState(item.description || '')
    const [quantity, setQuant] = useState(item.quantity)

    const debouncedSave = useCallback(
        debounce(async (formData) => {
            await dispatch(editQuantity(formData))
        }, 500),
        [],
    );

    useEffect(() => {
        const formData = {
            itemId: item.id,
            quantity: parseInt(quantity, 10)
        }

        if (changed) {
            debouncedSave(formData);
        }
    }, [debouncedSave, item.id, quantity, changed])

    const submitEdit = async (e) => {
        e.preventDefault();
        const formData = {
            itemId: item.id,
            name: name || item.name,
            quantity: parseInt(quantity, 10),
            description
        };
        const data = await dispatch(editItem(formData));
        if (data) {
            console.log("Errors!");
        }
        setShow(false);
    }

    const clickLook = () => {
        setShow(!show);
        setConfirm(false);
        setName(item.name);
        setDesc(item.description);
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteItem(id));
    }

    const clickDelete = () => {
        setConfirm(!confirm);
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const quantChange = (e) => {
        setChanged(true);
        setQuant(e.target.value);
    }

    const descChange = (e) => {
        setDesc(e.target.value);
    }

    const handleBlur = (e) => {
        if (e.target.value < 0 || !e.target.value) setQuant(0);
    };

    return (
        <Card>
            <form className="edit-item-form" id={`edit-item-${item.id}`} onSubmit={submitEdit}>
                <div className="title">
                    {!show ? <span className="edit-name-field">{item.name}</span> :
                        <input type="text" className="edit-name-field" value={name} onChange={nameChange} />}
                    <div>
                        <input className="edit-quant-field" value={quantity} min="0" onChange={quantChange} onBlur={handleBlur} type="number" />
                        <button type="button" className="item-reveal" onClick={clickLook}><FontAwesomeIcon icon={!show ? faSearchPlus : faSearchMinus} /></button>
                    </div>
                </div>
                {show && <textarea value={description} onChange={descChange} rows="8" />}
            </form>
            {
                show && <div className="buttons">
                    {!confirm ?
                        <>
                            <button type="submit" form={`edit-item-${item.id}`}>Update</button>
                            <button type='button' onClick={clickDelete}>Delete</button>
                        </> :
                        <form onSubmit={(e) => handleDelete(e, item.id)} className='item-delete-confirm'>
                            <button type='submit'>Confirm Delete</button>
                            <button type='button' onClick={clickDelete}>Cancel</button>
                        </form>}
                </div>
            }
        </Card >
    )
}

export default ItemCard;
