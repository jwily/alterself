import React, { useEffect, useState, useMemo, createContext } from "react";
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
    margin-top: 5rem;

    ul {
        margin-top: 3.5rem;
        display: grid;
        grid-template-columns: repeat(5, min-content);
        grid-template-rows: auto;
    }

    h1 {
        font-size: 3.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }

    .roster-fa {
        margin-right: .25rem;
    }
`

export const RosterContext = createContext();

const Roster = () => {

    const cardRefs = {};

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    // const vanish = () => {
    //     for (let key in cardRefs) {
    //         cardRefs[key].current.style.opacity = 0;
    //     }
    // };

    // const reveal = () => {
    //     for (let key in cardRefs) {
    //         cardRefs[key].current.style.opacity = 1;
    //     }
    // };

    // useEffect(() => {
    //     (async () => {
    //         await vanish();
    //         reveal();
    //     })();
    // }, [cardRefs])

    const user = useSelector(selectUser());
    const data = useSelector(state => state.characters);

    const charCards = useMemo(() => {
        return data.ids.map((id, idx) => {
            const char = data.entities.characters[id];
            return <CharCard key={char.id} char={char} idx={idx} ids={data.ids} />
        })
    }, [data.entities.characters, data.ids])

    return (
        <Container>
            <h1>Dive into an altered self</h1>
            <CreateCharModal />
            <RosterContext.Provider value={cardRefs}>
                <ul>
                    {isLoaded && charCards}
                </ul>
            </RosterContext.Provider>
        </Container>
    )
}

export default Roster;
