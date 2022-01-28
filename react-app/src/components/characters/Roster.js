import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { selectUser } from "../../store/session";
import { getChars } from "../../store/characters";

import CreateCharModal from "./CreateCharModal";
import CharCard from "./CharCard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 5%;

    ul {
        margin-top 5%;
        display: grid;
        grid-template-columns: repeat(5, min-content);
        grid-template-rows: auto;
    }
`

const Roster = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const user = useSelector(selectUser());
    const data = useSelector(state => state.characters);

    const charCards = useMemo(() => {
        return data.ids.map(id => {
            const char = data.entities.characters[id];
            return <CharCard key={char.id} char={char} />
        })
    }, [data.entities.characters, data.ids])

    return (
        <Container>
            <h1>Welcome to your roster, {user.username}</h1>
            <CreateCharModal />
            <ul>
                {isLoaded && charCards}
            </ul>
        </Container>
    )
}

export default Roster;
