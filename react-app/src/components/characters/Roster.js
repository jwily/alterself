import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import styled from "styled-components";

import { selectUser } from "../../store/session";
import { getChars, deleteChar } from "../../store/characters";

import CreateCharModal from "./CreateCharModal";

const CharCard = styled.li`
    margin: 1rem;
    a {
        color: gold;
    }
`

const Roster = () => {

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const user = useSelector(selectUser());
    const chars = useSelector(state => state.characters);

    return (
        <div>
            <h1>{user.username}'s Roster</h1>
            <br></br>
            <CreateCharModal />
            <br></br>
            {isLoaded && <ul>
                {Object.values(chars.entities.characters).map((char, idx) => {
                    return <CharCard key={idx}>
                        <Link to={`/roster/${char.id}`}>{char.name}</Link>
                        <p>{char.race}</p>
                        <p>Level {char.level} {char.class}</p>
                        <form onSubmit={(e) => handleDelete(e, char.id)}>
                            <button type='submit'>Delete</button>
                        </form>
                    </CharCard>
                })}
            </ul>}
        </div>
    )
}

export default Roster;
