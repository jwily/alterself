import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChar } from "../store/characters";

const Character = () => {

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChar(1)).then(() => setIsLoaded(true))
    }, [dispatch])

    const char = useSelector(state => state.characters.entities)

    console.log(char);

    return (
        <div>
            {isLoaded &&
                <ul>

                </ul>}
        </div>
    )
}

export default Character;
