import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 4.5rem;

    h1 {
        font-size: 3.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }
`

const Home = () => {

    const user = useSelector(state => state.session.user);

    return (
        <Container>
            <h1>Well come, {user.name}</h1>
            <h2>Hope you're well</h2>
        </Container>
    )
};

export default Home;
