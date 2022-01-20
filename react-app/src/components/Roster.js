import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getChars } from "../store/characters";

const Roster = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChars())
    }, [dispatch])

    return (
        <div>
            Roster
        </div>
    )
}

export default Roster;
