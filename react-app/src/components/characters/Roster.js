import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getChars } from "../../store/characters";

import CreateCharModal from "./CreateCharModal";
import CharCard from "./CharCard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2.5rem;

    ul {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: repeat(4, min-content);
        grid-template-rows: auto;
    }

    h1 {
        font-size: 3.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }

    h2 {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    }

    .roster-fa {
        margin-right: .25rem;
    }
`

const Roster = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const data = useSelector(state => state.characters);
    const user = useSelector(state => state.session.user)

    const charCards = useMemo(() => {
        return data.ids.map((id, idx) => {
            const char = data.entities.characters[id];
            return <CharCard key={char.id} char={char} idx={idx} ids={data.ids} />
        })
    }, [data.entities.characters, data.ids])

    return (
        <Container>
            <h1>Dive into an altered self</h1>
            <h2>Hope you're well, {user.name}</h2>
            <CreateCharModal />
            <ul>
                {isLoaded && charCards}
            </ul>
        </Container>
    )
}

export default Roster;
