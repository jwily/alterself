import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChars } from "../store/characters";

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
                    return <li key={idx}>
                        <p>{char.name}</p>
                        <p>{char.race}</p>
                        <p>{char.class}</p>
                        <p>{char.level}</p>
                    </li>
                })}
            </ul>}
        </div>
    )
}

export default Roster;
