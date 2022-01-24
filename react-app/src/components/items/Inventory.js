import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.ul`
    li {
        margin: 1rem;
    }
`

const Inventory = () => {

    const itemsData = useSelector(state => state.items.entities)

    return (
        <Container>
            {Object.values(itemsData).map((item) => {
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
