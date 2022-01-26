import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { getChar } from "../../store/characters";
import { getItems } from "../../store/items";
import { getSkills } from "../../store/skills";

import BlueBox from "../../global/BlueBox";

import Abilities from "./Abilities";
import Inventory from "../items/Inventory";

const Container = styled.div`
    display: flex;
`

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
        dispatch(getChar(charId))
            .then(() => dispatch(getSkills(charId)))
            .then(() => dispatch(getItems(charId)))
            .then(() => setIsLoaded(true))
    }, [dispatch, charId])

    const charData = useSelector(state => state.characters.entities)
    const skillsData = useSelector(state => state.skills.entities)

    if (!charData) {
        return (
            <Container>
                {isLoaded && <>
                    <h2>404</h2>
                    <p>Oops. Are you lost?</p>
                </>}
            </Container>
        )
    }

    return (
        <Container>
            {isLoaded &&
                <>
                    <BlueBox>
                        <p>{charData.character.name}</p>
                        <p>Level {charData.character.level} {charData.character.race} {charData.character.class}</p>
                        <p>{charData.character.exp} Experience Points</p>
                        <p>Profiency Bonus {profCalc(charData.character.level)}</p>
                        <p>Armor Class {10 + modCalc(charData.character.dex)}</p>
                    </BlueBox>

                    <Abilities charData={charData} />

                    <BlueBox>
                        <p>Acrobatics (Dex) :: {skillCalc(charData.character.level, charData.character.dex, skillsData[1])}</p>
                        <p>Animal Handling (Wis) :: {skillCalc(charData.character.level, charData.character.wis, skillsData[2])}</p>
                        <p>Arcana (Int) :: {skillCalc(charData.character.level, charData.character.int, skillsData[3])}</p>
                        <p>Athletics (Str) :: {skillCalc(charData.character.level, charData.character.str, skillsData[4])}</p>
                        <p>Deception (Cha) :: {skillCalc(charData.character.level, charData.character.cha, skillsData[5])}</p>
                        <p>History (Int) :: {skillCalc(charData.character.level, charData.character.int, skillsData[6])}</p>
                        <p>Insight (Wis) :: {skillCalc(charData.character.level, charData.character.wis, skillsData[7])}</p>
                        <p>Intimidation (Cha) :: {skillCalc(charData.character.level, charData.character.cha, skillsData[8])}</p>
                        <p>Investigation (Int) :: {skillCalc(charData.character.level, charData.character.int, skillsData[9])}</p>
                        <p>Medicine (Wis) :: {skillCalc(charData.character.level, charData.character.wis, skillsData[10])}</p>
                        <p>Nature (Int) :: {skillCalc(charData.character.level, charData.character.int, skillsData[11])}</p>
                        <p>Perception (Wis) :: {skillCalc(charData.character.level, charData.character.wis, skillsData[12])}</p>
                        <p>Performance (Cha) :: {skillCalc(charData.character.level, charData.character.cha, skillsData[13])}</p>
                        <p>Persuasion (Cha) :: {skillCalc(charData.character.level, charData.character.cha, skillsData[14])}</p>
                        <p>Religion (Int) :: {skillCalc(charData.character.level, charData.character.int, skillsData[15])}</p>
                        <p>Sleight of Hand (Dex) :: {skillCalc(charData.character.level, charData.character.dex, skillsData[16])}</p>
                        <p>Stealth (Dex) :: {skillCalc(charData.character.level, charData.character.dex, skillsData[17])}</p>
                        <p>Survival (Wis) :: {skillCalc(charData.character.level, charData.character.wis, skillsData[18])}</p>
                    </BlueBox>

                    <BlueBox>
                        <Inventory />
                    </BlueBox>
                </>}
        </Container>
    )
}

export default Character;
