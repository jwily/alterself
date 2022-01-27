import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import CreateItem from "./CreateItem";
import { deleteItem } from "../../store/items";

import BlueBox from "../../global/BlueBox";

const Container = styled.div`

    margin: 1rem;
    width: 15rem;

    li {
        margin-top: 1rem;
    }
`

const Inventory = () => {

    const dispatch = useDispatch()

    const items = useSelector(state => state.items)

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteItem(id));
    }

    return (
        <BlueBox className="items">
            <Container>
                <CreateItem />
                <ul>
                    {Object.values(items.entities).map((item, idx) => {
                        return (
                            <li key={idx}>
                                <p>{item.name} x {item.quantity}</p>
                                <p>{item.description}</p>
                                <form onSubmit={(e) => handleDelete(e, item.id)}>
                                    <button type='submit'>Delete</button>
                                </form>
                            </li>
                        )
                    })}
                </ul>
            </Container>
        </BlueBox >
    )
}

export default Inventory
