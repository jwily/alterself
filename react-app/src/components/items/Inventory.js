import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faShoppingBag,
    faReply
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";
import ItemCard from "./ItemCard";
import CreateItem from "./CreateItem";

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
        color: #ffc800;
    }
`

const Inventory = ({ fadeNum }) => {

    const data = useSelector(state => state.items);
    const theme = useSelector(state => state.theme.selection);

    const [add, setAdd] = useState(false);

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    const itemCards = useMemo(() => {
        return data.ids.map(id => {
            const item = data.entities[id];
            return <ItemCard key={item.id} item={item} />
        })
    }, [data.entities, data.ids])

    return (
        <BlueBox className="items" theme={theme} ref={card}>
            <Container>
                <div id="inventory-title">
                    <h2>
                        {!add && 'base' && 'Inventory'}
                        {add && 'What do you treasure?'}
                    </h2>
                    <button type="button" onClick={() => setAdd(!add)}>
                        {!add &&
                            <>
                                <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faShoppingBag} />
                            </>}
                        {add && <FontAwesomeIcon icon={faReply} />}
                    </button>
                </div>
                {add && <CreateItem setAdd={setAdd} />}
                <ul>{itemCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default Inventory
