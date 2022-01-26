import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFistRaised,
    faHandPaper,
    faHandHoldingWater,
    faHandSpock,
    faHandHoldingHeart,
    faHandPeace
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";

const Container = styled.form`
    width: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
`

const AbilityDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    .mod {
        font-size: 1.25rem;
        margin: .75rem;
        width: 3.75rem;
        display: flex;
        justify-content: space-between;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 4rem;
        padding-left: 1.25rem;
        color: gold;
        text-align: center;
    }

    text-align: center;
`

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const modDisplay = (score) => {
    if (score > 20) return '+ 5';
    else if (score < 0) return '- 5'
    const mod = modCalc(score);
    if (mod >= 0) return `+ ${mod}`
    else return `- ${Math.abs(mod)}`;
}

const Abilities = ({ charData }) => {

    const char = charData.character;

    const [str, setStr] = useState(char.str)
    const [dex, setDex] = useState(char.dex)
    const [con, setCon] = useState(char.con)
    const [int, setInt] = useState(char.int)
    const [wis, setWis] = useState(char.wis)
    const [cha, setCha] = useState(char.cha)

    const handleBlur = (e, func) => {
        if (e.target.value > 20) {
            func(20);
        } else if (e.target.value < 0 || !e.target.value) {
            func(0);
        }
    };

    return (
        <BlueBox>
            <Container>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-str`}>
                        <span>Strength</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faFistRaised} />
                            <span>{modDisplay(str)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-str`} type="number" value={str}
                        onBlur={(e) => handleBlur(e, setStr)}
                        onChange={(e) => setStr(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-dex`}>
                        <span>Dexterity</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPaper} />
                            <span>{modDisplay(dex)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-dex`} type="number" value={dex}
                        onBlur={(e) => handleBlur(e, setDex)}
                        onChange={(e) => setDex(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-con`}>
                        <span>Constitution</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingWater} />
                            <span>{modDisplay(con)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-con`} type="number" value={con}
                        onBlur={(e) => handleBlur(e, setCon)}
                        onChange={(e) => setCon(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-int`}>
                        <span>Intelligence</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandSpock} />
                            <span>{modDisplay(int)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-int`} type="number" value={int}
                        onBlur={(e) => handleBlur(e, setInt)}
                        onChange={(e) => setInt(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-wis`}>
                        <span>Wisdom</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                            <span>{modDisplay(wis)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-wis`} type="number" value={wis}
                        onBlur={(e) => handleBlur(e, setWis)}
                        onChange={(e) => setWis(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-cha`}>
                        <span>Charisma</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPeace} />
                            <span>{modDisplay(cha)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-cha`} type="number" value={cha}
                        onBlur={(e) => handleBlur(e, setCha)}
                        onChange={(e) => setCha(e.target.value)} />
                </AbilityDiv>

            </Container>
        </BlueBox >
    )
}

export default Abilities;
