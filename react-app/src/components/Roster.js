import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import styled from "styled-components";

import { getChars } from "../store/characters";

const CharCard = styled.li`
    margin: 1rem;
    a {
        color: gold;
    }
`

const Roster = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const chars = useSelector(state => state.characters.entities)

    console.log(chars);

    return (
        <div>
            {isLoaded && <ul>
                {Object.values(chars).map((char, idx) => {
                    console.log(char);
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
