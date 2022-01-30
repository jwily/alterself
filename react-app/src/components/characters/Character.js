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
import BlackBox from "../../global/BlackBox";
import Abilities from "./Abilities";
import Inventory from "../items/Inventory";
import FeaturesAndTraits from "../features/Features";
import Proficiencies from "../profs/Proficiencies";

import { setHide } from "../../store/help";

import scholar from '../../images/scholar.png';

const Parent = styled.div`
    padding-top: 1.5rem;
    padding-left: 1.5rem;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, min-content);
    grid-template-rows: min-content min-content 1fr;

    .vitals {
        margin-bottom: 1rem;
        margin-left: 1rem;

        padding: 1rem;

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

    .throws, .skills {

        h2 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
    }

    .throws {
        padding: 1rem;
        margin-bottom: 1rem;

        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;

        li {
            display: flex;
            justify-content: space-between;
            margin-bottom: .25rem;
            margin-left: .5rem;
            margin-right: 1rem;
        }
    }

    .skills {
        width: 18.5rem;
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

    .scholar-div {
        position: fixed;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .scholar-title {
        margin-bottom: .5rem;
    }

    .scholar-errors {
        width: 27.5rem;
        padding: 1rem;
        background: rgba(20, 20, 20, .75);
        margin-right: 1.5rem;
    }

    .scholar-close-text {
        color: grey;
        font-size: .85rem;
        margin-top: 1rem;
    }

    .scholar-text > div {
        margin-bottom: .5rem;
    }

    .scholar {
        align-self: end;

        background-image: url(${scholar});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 5rem;
        height: 5rem;

        border: none;
        background-color: transparent;
        margin-bottom: 1rem;
        margin-right: 1rem;
        margin-top: .5rem;
    }

    // .scholar:hover {
    //     filter: drop-shadow(0 0 5px #D4AF37);
    // }
`

const SkillLiBase = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .25rem;
    margin-left: .5rem;
    margin-right: 1rem;

    .skill-li-secondary {
        display: flex;
        justify-content: space-between;
        width: 4.5rem;
    }

    .skill-atr {
        color: #bebebe;
    }

    .skill-mod {
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

const skillsObj = {
    '0': ['Acrobatics', 'Dex', 'dex'],
    '1': ['Animal Handling', 'Wis', 'wis'],
    '2': ['Arcana', 'Int', 'int'],
    '3': ['Athletics', 'Str', 'str'],
    '4': ['Deception', 'Cha', 'cha'],
    '5': ['History', 'Int', 'int'],
    '6': ['Insight', 'Wis', 'wis'],
    '7': ['Intimidation', 'Cha', 'cha'],
    '8': ['Investigation', 'Int', 'int'],
    '9': ['Medicine', 'Wis', 'wis'],
    '10': ['Nature', 'Int', 'int'],
    '11': ['Perception', 'Wis', 'wis'],
    '12': ['Performance', 'Cha', 'cha'],
    '13': ['Persuasion', 'Cha', 'cha'],
    '14': ['Religion', 'Int', 'int'],
    '15': ['Sleight of Hand', 'Dex', 'dex'],
    '16': ['Stealth', 'Dex', 'dex'],
    '17': ['Survival', 'Wis', 'wis'],
}

const SkillLi = ({ charData, skillsData, num }) => {

    const level = charData.level;
    const abilityScore = charData[skillsObj[num][2]];
    const boolean = skillsData[num]
    const mod = skillCalc(level, abilityScore, boolean)

    return (
        <SkillLiBase>
            <div>
                {skillsObj[num][0]}
            </div>
            <div className="skill-li-secondary">
                <div className="skill-atr">
                    {skillsObj[num][1]}
                </div>
                <div className="skill-mod">
                    {mod > 0 ? `+${mod}` : mod}
                </div>
            </div>
        </SkillLiBase>
    )
};

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
    const helpData = useSelector(state => state.help)

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

                        <BlueBox className="throws">
                            <h2>Saving Throws</h2>
                            <ul>
                                <li>
                                    <div>
                                        Strength
                                    </div>
                                    <div>
                                        {modCalc(charData.str) > 0 ? `+${modCalc(charData.str)}` : modCalc(charData.str)}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Dexterity
                                    </div>
                                    <div>
                                        {modCalc(charData.dex) > 0 ? `+${modCalc(charData.dex)}` : modCalc(charData.dex)}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Constitution
                                    </div>
                                    <div>
                                        {modCalc(charData.con) > 0 ? `+${modCalc(charData.con)}` : modCalc(charData.con)}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Intelligence
                                    </div>
                                    <div>
                                        {modCalc(charData.int) > 0 ? `+${modCalc(charData.int)}` : modCalc(charData.int)}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Wisdom
                                    </div>
                                    <div>
                                        {modCalc(charData.wis) > 0 ? `+${modCalc(charData.wis)}` : modCalc(charData.wis)}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Charisma
                                    </div>
                                    <div>
                                        {modCalc(charData.cha) > 0 ? `+${modCalc(charData.cha)}` : modCalc(charData.cha)}
                                    </div>
                                </li>
                            </ul>
                        </BlueBox>

                        <BlueBox className="skills">
                            <h2>Skills</h2>
                            <ul>
                                {Object.keys(skillsObj).map(num => {
                                    return <SkillLi
                                        charData={charData}
                                        skillsData={skillsData}
                                        key={num}
                                        num={num} />
                                })}
                            </ul>
                        </BlueBox>

                        <div className="profs-feats">
                            <Proficiencies />
                            <FeaturesAndTraits />
                        </div>

                        <Inventory />
                    </>}

                <div className="scholar-div">
                    {helpData.show && <BlackBox className="scholar-errors" onMouseEnter={() => dispatch(setHide())}>
                        <div className="scholar-title">The Scholar says:</div>
                        <div className="scholar-text">
                            {helpData.errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="scholar-close-text">Mouse over to dismiss</div>
                    </BlackBox>}
                    <button className="scholar"></button>
                </div>
            </Container>
        </Parent>
    )
}

export default Character;
