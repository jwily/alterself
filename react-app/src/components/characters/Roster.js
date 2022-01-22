import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import styled from "styled-components";

import { selectUser } from "../../store/session";
import { getChars } from "../../store/characters";

import CreateCharacter from "./CreateCharacter";

const CharCard = styled.li`
    margin: 1rem;
    a {
        color: gold;
    }
`

const Roster = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [boop, setBoop] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const user = useSelector(selectUser());
    const chars = useSelector(state => state.characters.entities);

    return (
        <div>
            <h1>{user.username}'s Roster</h1>
            <br></br>
            <h3>Create</h3>
            <CreateCharacter boop={boop} setBoop={setBoop} />
            <br></br>
            {isLoaded && <ul>
                {Object.values(chars).map((char, idx) => {
                    return <CharCard key={idx}>
                        <Link to={`/roster/${char.id}`}>{char.name}</Link>
                        <p>{char.race}</p>
                        <p>Level {char.level} {char.class}</p>
                    </CharCard>
                })}
            </ul>}
        </div>
    )
}

export default Roster;
