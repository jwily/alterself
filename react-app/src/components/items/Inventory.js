import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CreateItem from "./CreateItem";

const Container = styled.ul`
    li {
        margin: 1rem;
    }
`

const Inventory = () => {

    const items = useSelector(state => state.items)

    return (
        <Container>
            <CreateItem />
            {Object.values(items.entities).map((item) => {
                return (
                    <li>
                        <p>{item.name} x {item.quantity}</p>
                        <p>{item.description}</p>
                    </li>
                )
            })}
        </Container>
    )
}

export default Inventory
