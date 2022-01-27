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

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: right;

        button {
            margin-left: .5rem;
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
        font-size: .75rem;
    }

    span {
        white-space: nowrap;
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
    }
`

const ItemCard = ({ item }) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteItem(id));
    }

    return (
        <Card>
            <div className="title">
                <span>{item.name}</span>
                <button type="button" className="item-reveal" onClick={() => setShow(!show)}><FontAwesomeIcon icon={!show ? faPlusCircle : faMinusCircle} /></button>
            </div>
            {show && item.description && < p > {item.description}</p>}
            {
                show && <div className="buttons">
                    <button type="button">Edit</button>
                    <form onSubmit={(e) => handleDelete(e, item.id)}>
                        <button type='submit'>Delete</button>
                    </form>
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
                    {mode === 'base' && <button type="button" onClick={() => setMode('add')}><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faShoppingBag} /></button>}
                </div>
                {mode === 'add' && <CreateItem setMode={setMode} />}
                <ul>{itemCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default Inventory
