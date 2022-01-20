import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChar } from "../store/characters";

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Character = () => {

    const params = useParams();

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChar(params.charId)).then(() => setIsLoaded(true))
    }, [dispatch, params.charId])

    const char = useSelector(state => state.characters.entities.char)

    console.log(char);

    return (
        <div>
            {isLoaded &&
                <ul>
                    <li>{char.name}</li>
                    <li>Level {char.level} {char.race} {char.class}</li>
                    <li>{char.exp} Experience Points</li>
                    <li>Strength {char.str}</li>
                    <li>Dexterity {char.dex}</li>
                    <li>Constitution {char.con}</li>
                    <li>Intelligence {char.int}</li>
                    <li>Wisdom {char.wis}</li>
                    <li>Charisma {char.cha}</li>
                    <li>Armor Class {10 + modCalc(char.dex)}</li>
                </ul>}
        </div>
    )
}

export default Character;
