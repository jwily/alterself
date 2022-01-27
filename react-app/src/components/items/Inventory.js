import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import CreateItem from "./CreateItem";
import { deleteItem } from "../../store/items";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faShoppingBag,
    faPlusCircle,
    faMinusCircle
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";

const Container = styled.div`

    margin: 1rem;
    width: 17.5rem;

    h2 {
        font-size: 1.25rem;
    }

    #inventory-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        margin-bottom: .5rem;
        height: 1.5rem;
    }

    li {
        margin-top: .25rem;
    }

    .item-reveal {
        width: fit-content;
        background-color: transparent;
        border: 0;
        color: whitesmoke;
        padding: .5rem;
        border-radius: .5rem;
        font-family: 'Inconsolata', monospace;
        cursor: pointer;
    }

    .item-reveal:active {
        background-color: rgba(51, 48, 47, 0.25);
    }

    .item-reveal:hover {
        color: gold;
    }
`

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
    }

    input.edit-name-field {
        color: gold;
    }

    textarea {
        margin-top: .5rem;
        resize: none;
        color: gold;
    }
`

const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [saved, setSaved] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [name, setName] = useState(item.name);
    const [desc, setDesc] = useState(item.description)

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

    const descChange = (e) => {
        setDesc(e.target.value);
        setSaved(false);
    }

    return (
        <Card>
            <form className="edit-item-form">
                <div className="title">
                    {!show ? <span className="edit-name-field">{item.name}</span> :
                        <input className="edit-name-field" value={name} onChange={nameChange} />}
                    <button type="button" className="item-reveal" onClick={() => {
                        setShow(!show);
                        setConfirm(false);
                        setSaved(false);
                    }}><FontAwesomeIcon icon={!show ? faPlusCircle : faMinusCircle} /></button>
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

const Inventory = () => {

    const data = useSelector(state => state.items)

    const [mode, setMode] = useState('base');

    const itemCards = useMemo(() => {
        return data.ids.map(id => {
            const item = data.entities[id];
            return <ItemCard key={item.id} item={item} setMode={setMode} />
        })
    }, [data.entities, data.ids])

    return (
        <BlueBox className="items">
            <Container>
                <div id="inventory-title">
                    <h2>
                        {mode === 'base' && 'Inventory'}
                        {mode === 'add' && 'Add Item'}
                        {mode === 'edit' && 'Edit Item'}
                    </h2>
                    {mode === 'base' && <button type="button" onClick={() => setMode('add')}>
                        <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faShoppingBag} />
                    </button>}
                </div>
                {mode === 'add' && <CreateItem setMode={setMode} />}
                <ul>{itemCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default Inventory
