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

    const charList = useSelector(state => state.session.user.characters)

    useEffect(() => {
        if (charId in charList) {
            dispatch(getChar(charId)).then(() => setIsLoaded(true))
        } else return;
    }, [dispatch, charId, charList])

    const data = useSelector(state => state.characters.entities)

    if (!data) {
        return (
            <div>404</div>
        )
    }

    return (
        <div>
            {isLoaded &&
                <ul>
                    <li>{data.character.name}</li>
                    <li>Level {data.character.level} {data.character.race} {data.character.class}</li>
                    <li>{data.character.exp} Experience Points</li>
                    <li>Profiency Bonus {profCalc(data.character.level)}</li>
                    <li>Strength {data.character.str}</li>
                    <li>Dexterity {data.character.dex}</li>
                    <li>Constitution {data.character.con}</li>
                    <li>Intelligence {data.character.int}</li>
                    <li>Wisdom {data.character.wis}</li>
                    <li>Charisma {data.character.cha}</li>
                    <li>Armor Class {10 + modCalc(data.character.dex)}</li>
                </ul>}
        </div>
    )
}

export default Character;
