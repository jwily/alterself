import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CreateItem from "./CreateItem";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";
import ItemCard from "./ItemCard";

const Container = styled.div`

    margin: 1rem;
    width: 20rem;

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
                        {mode === 'add' && 'Find something new?'}
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
