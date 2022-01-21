import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChar } from "../../store/characters";
import { getSkills } from "../../store/skills";

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const profCalc = (level) => {
    return (1 + Math.ceil(level / 4))
}

const skillCalc = (level, ability, boolean) => {
    return (boolean ? modCalc(ability) + profCalc(level) : modCalc(ability))
}

const Character = () => {

    const { charId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChar(charId)).then(() => dispatch(getSkills(charId))).then(() => setIsLoaded(true))
    }, [dispatch, charId])

    const charData = useSelector(state => state.characters.entities)
    const skillsData = useSelector(state => state.skills.entities)

    if (!charData) {
        return (
            <div>
                <h2>404</h2>
                <p>Oops. Are you lost?</p>
            </div>
        )
    }

    return (
        <div>
            {isLoaded &&
                <>
                    <ul>
                        <li>{charData.character.name}</li>
                        <li>Level {charData.character.level} {charData.character.race} {charData.character.class}</li>
                        <li>{charData.character.exp} Experience Points</li>
                        <li>Profiency Bonus {profCalc(charData.character.level)}</li>
                        <li>Armor Class {10 + modCalc(charData.character.dex)}</li>
                        <br></br>
                        <li>Strength {charData.character.str}</li>
                        <li>Dexterity {charData.character.dex}</li>
                        <li>Constitution {charData.character.con}</li>
                        <li>Intelligence {charData.character.int}</li>
                        <li>Wisdom {charData.character.wis}</li>
                        <li>Charisma {charData.character.cha}</li>
                        <br></br>
                        <li>Acrobatics {skillCalc(charData.character.level, charData.character.dex, skillsData.skills[1])}</li>
                        <li>Animal Handling {skillCalc(charData.character.level, charData.character.wis, skillsData.skills[2])}</li>
                        <li>Arcana {skillCalc(charData.character.level, charData.character.int, skillsData.skills[3])}</li>
                        <li>Athletics {skillCalc(charData.character.level, charData.character.str, skillsData.skills[4])}</li>
                        <li>Deception {skillCalc(charData.character.level, charData.character.cha, skillsData.skills[5])}</li>
                        <li>History {skillCalc(charData.character.level, charData.character.int, skillsData.skills[6])}</li>
                        <li>Insight {skillCalc(charData.character.level, charData.character.wis, skillsData.skills[7])}</li>
                        <li>Intimidation {skillCalc(charData.character.level, charData.character.cha, skillsData.skills[8])}</li>
                        <li>Investigation {skillCalc(charData.character.level, charData.character.int, skillsData.skills[9])}</li>
                        <li>Medicine {skillCalc(charData.character.level, charData.character.wis, skillsData.skills[10])}</li>
                        <li>Nature {skillCalc(charData.character.level, charData.character.int, skillsData.skills[11])}</li>
                        <li>Perception {skillCalc(charData.character.level, charData.character.wis, skillsData.skills[12])}</li>
                        <li>Performance {skillCalc(charData.character.level, charData.character.cha, skillsData.skills[13])}</li>
                        <li>Persuasion {skillCalc(charData.character.level, charData.character.cha, skillsData.skills[14])}</li>
                        <li>Religion {skillCalc(charData.character.level, charData.character.int, skillsData.skills[15])}</li>
                        <li>Sleight of Hand {skillCalc(charData.character.level, charData.character.dex, skillsData.skills[16])}</li>
                        <li>Stealth {skillCalc(charData.character.level, charData.character.dex, skillsData.skills[17])}</li>
                        <li>Survival {skillCalc(charData.character.level, charData.character.wis, skillsData.skills[18])}</li>
                    </ul>
                </>}
        </div>
    )
}

export default Character;
