import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getChar } from "../../store/characters";
import { getItems } from "../../store/items";
import { getSkills } from "../../store/skills";

import BlueBox from "../../global/BlueBox";
import Abilities from "./Abilities";
import Inventory from "../items/Inventory";

import scholar from '../../images/scholar.png';

const Parent = styled.div`
    display: flex;
    padding-top: 2.5%;
    width: 100%:
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-template-rows: auto;
    grid-template-areas:
        "abilities throws vitals vitals vitals"
        "abilities throws profs feats items"
        "abilities skills profs feats items"
        "abilities skills profs feats items";

    .vitals {
        grid-area: vitals;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }

    .abilities {
        grid-area: abilities;
        margin-right: 1rem;
    }

    .throws {
        grid-area: throws;
        margin-bottom: 1rem;
    }

    .skills {
        grid-area: skills;
        width: 20rem;
        padding: 1rem;
    }

    .profs {
        grid-area: profs;
        width: 15rem;
        margin-left: 1rem;
    }

    .feats {
        grid-area: feats;
        width: 15rem;
        margin-left: 1rem;
    }

    .items {
        grid-area: items;
        margin-left: 1rem;
    }

    .scholar {
        background-image: url(${scholar});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 5em;
        height: 5em;
        position: fixed;
        right: 0;
        bottom: 0;
        border: none;
        background-color: transparent;
        margin: 1rem;
    }

    .scholar:hover {
        filter: drop-shadow(0 0 5px #D4AF37);
    }
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

    // This seems to be causing some problems, find alternate solution
    if (!charData) {
        return (
            <div>
                {isLoaded && <>
                    <h2>404</h2>
                    <p>Oops. Are you lost?</p>
                </>}
            </div>
        )
    }

    return (
        <Parent>
            <Container>
                {isLoaded &&
                    <>
                        <BlueBox className="vitals">
                            <p>{charData.character.name}</p>
                            <p>Level {charData.character.level} {charData.character.race} {charData.character.class}</p>
                            <p>{charData.character.exp} Experience Points</p>
                            <p>Profiency Bonus {profCalc(charData.character.level)}</p>
                            <p>Armor Class {10 + modCalc(charData.character.dex)}</p>
                        </BlueBox>

                        <BlueBox className="abilities">
                            <Abilities charData={charData} />
                        </BlueBox>

                        <BlueBox className="throws"></BlueBox>

                        <BlueBox className="skills">
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

                        <BlueBox className="profs">
                            {/* <Inventory /> */}
                        </BlueBox>

                        <BlueBox className="feats">
                            {/* <Inventory /> */}
                        </BlueBox>

                        <BlueBox className="items">
                            <Inventory />
                        </BlueBox>
                        <button className="scholar"></button>
                    </>}
            </Container>
        </Parent>
    )
}

export default Character;
