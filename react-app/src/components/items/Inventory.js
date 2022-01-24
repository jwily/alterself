import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import CreateItem from "./CreateItem";
import { deleteItem } from "../../store/items";

const Container = styled.ul`
    li {
        margin: 1rem;
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
        <Container>
            <CreateItem />
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
        </Container>
    )
}

export default Inventory
