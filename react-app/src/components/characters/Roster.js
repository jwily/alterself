import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../store/session";
import { getChars } from "../../store/characters";

import CreateCharModal from "./CreateCharModal";
import CharCard from "./CharCard";

const Roster = () => {

    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars()).then(() => setIsLoaded(true))
    }, [dispatch])

    const user = useSelector(selectUser());
    const data = useSelector(state => state.characters);

    return (
        <div>
            <h1>{user.username}'s Roster</h1>
            <br></br>
            <CreateCharModal />
            <br></br>
            {isLoaded && <ul>
                {Object.values(data.entities.characters).map((char, idx) => {
                    return <CharCard key={idx} char={char} />
                })}
            </ul>}
        </div>
    )
}

export default Roster;
