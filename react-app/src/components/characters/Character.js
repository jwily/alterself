import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChar } from "../../store/characters";

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const profCalc = (level) => {
    return (1 + Math.ceil(level / 4))
}

const Character = () => {

    const { charId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChar(charId)).then(() => setIsLoaded(true))
    }, [dispatch, charId])

    const char = useSelector(state => state.characters.entities.single)

    console.log(char);

    return (
        <div>
            {isLoaded &&
                <ul>
                    <li>{char.name}</li>
                    <li>Level {char.level} {char.race} {char.class}</li>
                    <li>{char.exp} Experience Points</li>
                    <li>Profiency Bonus {profCalc(char.level)}</li>
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
