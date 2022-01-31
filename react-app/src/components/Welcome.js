import React from "react";
import styled from "styled-components";

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 3.5rem;

    h1 {
        font-size: 3.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }
`

const Welcome = () => {
    return (
        <Container>
            <h1>Alter Self</h1>
        </Container>
    )
};

export default Welcome;
