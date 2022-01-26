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

const Container = styled.div`
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
        width: 3.5rem;
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
        padding-left: 1.5rem;
        color: gold;
    }

    text-align: center;
`

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Abilities = ({ charData }) => {

    const char = charData.character;

    const [str, setStr] = useState(char.str)
    const [dex, setDex] = useState(char.dex)
    const [con, setCon] = useState(char.con)
    const [int, setInt] = useState(char.int)
    const [wis, setWis] = useState(char.wis)
    const [cha, setCha] = useState(char.cha)

    return (
        <BlueBox>
            <Container>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-str`}>
                        <span>Strength</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faFistRaised} />
                            <span>{str >= 10 && '+'}{modCalc(str)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-str`} type="number" value={str}
                        onChange={(e) => setStr(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-dex`}>
                        <span>Dexterity</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPaper} />
                            <span>{dex >= 10 && '+'}{modCalc(dex)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-dex`} type="number" value={dex}
                        onChange={(e) => setDex(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-con`}>
                        <span>Constitution</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingWater} />
                            <span>{con >= 10 && '+'}{modCalc(con)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-con`} type="number" value={con}
                        onChange={(e) => setCon(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-int`}>
                        <span>Intelligence</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandSpock} />
                            <span>{int >= 10 && '+'}{modCalc(int)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-int`} type="number" value={int}
                        onChange={(e) => setInt(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-wis`}>
                        <span>Wisdom</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                            <span>{wis >= 10 && '+'}{modCalc(wis)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-wis`} type="number" value={wis}
                        onChange={(e) => setWis(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-cha`}>
                        <span>Charisma</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPeace} />
                            <span>{cha >= 10 && '+'}{modCalc(cha)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-cha`} type="number" value={cha}
                        onChange={(e) => setCha(e.target.value)} />
                </AbilityDiv>

            </Container>
        </BlueBox >
    )
}

export default Abilities;
