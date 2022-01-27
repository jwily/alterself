import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { getChar } from "../../store/characters";
import { getItems } from "../../store/items";
import { getSkills } from "../../store/skills";
import { selectUser } from "../../store/session";

import BlueBox from "../../global/BlueBox";
import Abilities from "./Abilities";
import Inventory from "../items/Inventory";

import scholar from '../../images/scholar.png';

const Parent = styled.div`
    display: flex;
    padding-top: 1.5%;
    padding-left: 1.5%;
    width: 100%;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-template-rows: repeat(4, 11.5rem);
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
        display: flex;
        justify-content: center;
        align-items: center;
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
        width: 5rem;
        height: 5rem;
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

    const charData = useSelector(state => state.characters.entities.character)
    const skillsData = useSelector(state => state.skills)

    return (
        <Parent>
            <Container>
                {isLoaded &&
                    <>
                        <BlueBox className="vitals">
                            <p>{charData.name}</p>
                            <p>Level {charData.level} {charData.race} {charData.class}</p>
                            <p>{charData.exp} Experience Points</p>
                            <p>Profiency Bonus {profCalc(charData.level)}</p>
                            <p>Armor Class {10 + modCalc(charData.dex)}</p>
                        </BlueBox>

                        <Abilities charData={charData} />

                        <BlueBox className="throws"></BlueBox>

                        <BlueBox className="skills">
                            <p>Acrobatics (Dex) :: {skillCalc(charData.level, charData.dex, skillsData.entities[1])}</p>
                            <p>Animal Handling (Wis) :: {skillCalc(charData.level, charData.wis, skillsData.entities[2])}</p>
                            <p>Arcana (Int) :: {skillCalc(charData.level, charData.int, skillsData.entities[3])}</p>
                            <p>Athletics (Str) :: {skillCalc(charData.level, charData.str, skillsData.entities[4])}</p>
                            <p>Deception (Cha) :: {skillCalc(charData.level, charData.cha, skillsData.entities[5])}</p>
                            <p>History (Int) :: {skillCalc(charData.level, charData.int, skillsData.entities[6])}</p>
                            <p>Insight (Wis) :: {skillCalc(charData.level, charData.wis, skillsData.entities[7])}</p>
                            <p>Intimidation (Cha) :: {skillCalc(charData.level, charData.cha, skillsData.entities[8])}</p>
                            <p>Investigation (Int) :: {skillCalc(charData.level, charData.int, skillsData.entities[9])}</p>
                            <p>Medicine (Wis) :: {skillCalc(charData.level, charData.wis, skillsData.entities[10])}</p>
                            <p>Nature (Int) :: {skillCalc(charData.level, charData.int, skillsData.entities[11])}</p>
                            <p>Perception (Wis) :: {skillCalc(charData.level, charData.wis, skillsData.entities[12])}</p>
                            <p>Performance (Cha) :: {skillCalc(charData.level, charData.cha, skillsData.entities[13])}</p>
                            <p>Persuasion (Cha) :: {skillCalc(charData.level, charData.cha, skillsData.entities[14])}</p>
                            <p>Religion (Int) :: {skillCalc(charData.level, charData.int, skillsData.entities[15])}</p>
                            <p>Sleight of Hand (Dex) :: {skillCalc(charData.level, charData.dex, skillsData.entities[16])}</p>
                            <p>Stealth (Dex) :: {skillCalc(charData.level, charData.dex, skillsData.entities[17])}</p>
                            <p>Survival (Wis) :: {skillCalc(charData.level, charData.wis, skillsData.entities[18])}</p>
                        </BlueBox>

                        <BlueBox className="profs">
                        </BlueBox>

                        <BlueBox className="feats">
                        </BlueBox>

                        <Inventory />
                        <button className="scholar"></button>
                    </>}
            </Container>
        </Parent>
    )
}

export default Character;
