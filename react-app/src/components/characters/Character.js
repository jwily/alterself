import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { getChar } from "../../store/characters";
import { getItems } from "../../store/items";
import { getSkills } from "../../store/skills";
import { getFeats } from "../../store/features";
import { getProfs } from "../../store/profs";

import BlueBox from "../../global/BlueBox";
import Abilities from "./Abilities";
import Inventory from "../items/Inventory";
import FeaturesAndTraits from "../features/Features";
import Proficiencies from "../profs/Proficiencies";

import scholar from '../../images/scholar.png';

const Parent = styled.div`
    padding-top: 1.5%;
    padding-left: 1.5%;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, min-content);
    grid-template-rows: min-content min-content 1fr;

    .vitals {
        margin-bottom: 1rem;
        margin-left: 1rem;

        grid-column-start: 3;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .abilities {
        margin-right: 1rem;

        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .throws {
        margin-bottom: 1rem;

        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .skills {
        width: 20rem;
        padding: 1rem;

        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .profs-feats {
        height: min-content;

        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 4;

        margin-bottom: 1rem;
    }

    .profs {
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    .feats {
        margin-left: 1rem;
    }

    .items {
        margin-left: 1rem;
        height: min-content;
        margin-bottom: 1rem;

        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 4;
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

    const [isLoaded, setIsLoaded] = useState(false);
    const [badId, setBadId] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (isNaN(parseInt(charId, 10))) {
                setBadId(true);
                return;
            }
            const char = await dispatch(getChar(charId));
            if (char) {
                await dispatch(getSkills(charId));
                await dispatch(getItems(charId));
                await dispatch(getProfs(charId));
                await dispatch(getFeats(charId));
                setIsLoaded(true);
            } else {
                setBadId(true);
            }
        })();
    }, [dispatch, charId])

    const charData = useSelector(state => state.characters.entities.character)
    const skillsData = useSelector(state => state.skills.entities)

    if (badId) return (
        <Redirect to='/roster' />
    )

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
                            <p>Acrobatics (Dex) :: {skillCalc(charData.level, charData.dex, skillsData[1])}</p>
                            <p>Animal Handling (Wis) :: {skillCalc(charData.level, charData.wis, skillsData[2])}</p>
                            <p>Arcana (Int) :: {skillCalc(charData.level, charData.int, skillsData[3])}</p>
                            <p>Athletics (Str) :: {skillCalc(charData.level, charData.str, skillsData[4])}</p>
                            <p>Deception (Cha) :: {skillCalc(charData.level, charData.cha, skillsData[5])}</p>
                            <p>History (Int) :: {skillCalc(charData.level, charData.int, skillsData[6])}</p>
                            <p>Insight (Wis) :: {skillCalc(charData.level, charData.wis, skillsData[7])}</p>
                            <p>Intimidation (Cha) :: {skillCalc(charData.level, charData.cha, skillsData[8])}</p>
                            <p>Investigation (Int) :: {skillCalc(charData.level, charData.int, skillsData[9])}</p>
                            <p>Medicine (Wis) :: {skillCalc(charData.level, charData.wis, skillsData[10])}</p>
                            <p>Nature (Int) :: {skillCalc(charData.level, charData.int, skillsData[11])}</p>
                            <p>Perception (Wis) :: {skillCalc(charData.level, charData.wis, skillsData[12])}</p>
                            <p>Performance (Cha) :: {skillCalc(charData.level, charData.cha, skillsData[13])}</p>
                            <p>Persuasion (Cha) :: {skillCalc(charData.level, charData.cha, skillsData[14])}</p>
                            <p>Religion (Int) :: {skillCalc(charData.level, charData.int, skillsData[15])}</p>
                            <p>Sleight of Hand (Dex) :: {skillCalc(charData.level, charData.dex, skillsData[16])}</p>
                            <p>Stealth (Dex) :: {skillCalc(charData.level, charData.dex, skillsData[17])}</p>
                            <p>Survival (Wis) :: {skillCalc(charData.level, charData.wis, skillsData[18])}</p>
                        </BlueBox>

                        <div className="profs-feats">
                            <Proficiencies />
                            <FeaturesAndTraits />
                        </div>

                        <Inventory />
                    </>}
                <button className="scholar"></button>
            </Container>
        </Parent>
    )
}

export default Character;
