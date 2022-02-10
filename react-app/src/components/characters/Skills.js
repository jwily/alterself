import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import BlueBox from "../../global/BlueBox";

const skillsObj = {
    "1": { "name": "Acrobatics", "ability": "Dex" },
    "2": { "name": "Animal Handling", "ability": "Wis" },
    "3": { "name": "Arcana", "ability": "Int" },
    "4": { "name": "Athletics", "ability": "Str" },
    "5": { "name": "Deception", "ability": "Cha" },
    "6": { "name": "History", "ability": "Int" },
    "7": { "name": "Insight", "ability": "Wis" },
    "8": { "name": "Intimidation", "ability": "Cha" },
    "9": { "name": "Investigation", "ability": "Int" },
    "10": { "name": "Medicine", "ability": "Wis" },
    "11": { "name": "Nature", "ability": "Int" },
    "12": { "name": "Perception", "ability": "Wis" },
    "13": { "name": "Performance", "ability": "Cha" },
    "14": { "name": "Persuasion", "ability": "Cha" },
    "15": { "name": "Religion", "ability": "Int" },
    "16": { "name": "Sleight of Hand", "ability": "Dex" },
    "17": { "name": "Stealth", "ability": "Dex" },
    "18": { "name": "Survival", "ability": "Wis" },
}


const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}


const SkillCard = ({ charData, num }) => {

    const hoverState = useSelector(state => state.help.hover);

    const name = skillsObj[num].name;
    const ability = skillsObj[num].ability.toLowerCase();
    const score = charData[ability];
    const mod = modCalc(score);

    return (
        <SkillLi hover={hoverState === ability}>
            <div>{name}</div>
            <div>{mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`}</div>
        </SkillLi>
    )
}

const Container = styled.div`

    margin: 1rem;
    width: 15rem;

    h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }
`

const SkillLi = styled.li`

    display: flex;
    justify-content: space-between;
    margin-top: .25rem;
    margin-right: .5rem;

    ${props => props.hover && `
    color: gold;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    `}
    transition: all .15s;
`

const Skills = ({ charData, fadeNum }) => {

    const theme = useSelector(state => state.theme.selection)

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    return (

        <BlueBox className="skills" theme={theme} ref={card}>
            <Container >
                <h2>Skills</h2>
                <ul>
                    {Object.keys(skillsObj).map((num) => {
                        return <SkillCard key={num} num={num} charData={charData} />
                    })}
                </ul>
            </Container>
        </BlueBox>

    )

}


export default Skills
