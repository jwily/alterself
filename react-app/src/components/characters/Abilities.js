import React, { useState } from "react";
import styled from "styled-components";

import BlueBox from "../../global/BlueBox";

const Container = styled.div`
    width: 12.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        width: 5rem;
        margin-bottom: 1rem;
    }
`

const AbilityDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    .mod {
        font-size: 1.5rem;
        margin: .5rem;
        font-weight: bold;
        color: gold;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input {
        width: 4rem;
        padding-left: 1.5rem;
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
                        <span className="mod">{str >= 10 && '+'}{modCalc(str)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-str`} type="number" value={str}
                        onChange={(e) => setStr(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-dex`}>
                        <span>Dexterity</span>
                        <span className="mod">{dex >= 10 && '+'}{modCalc(dex)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-dex`} type="number" value={dex}
                        onChange={(e) => setDex(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-con`}>
                        <span>Constitution</span>
                        <span className="mod">{con >= 10 && '+'}{modCalc(con)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-con`} type="number" value={con}
                        onChange={(e) => setCon(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-int`}>
                        <span>Intelligence</span>
                        <span className="mod">{int >= 10 && '+'}{modCalc(int)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-int`} type="number" value={int}
                        onChange={(e) => setInt(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-wis`}>
                        <span>Wisdom</span>
                        <span className="mod">{wis >= 10 && '+'}{modCalc(wis)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-wis`} type="number" value={wis}
                        onChange={(e) => setWis(e.target.value)} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-cha`}>
                        <span>Charisma</span>
                        <span className="mod">{cha >= 10 && '+'}{modCalc(cha)}</span>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-cha`} type="number" value={cha}
                        onChange={(e) => setCha(e.target.value)} />
                </AbilityDiv>
            </Container>
        </BlueBox>
    )
}

export default Abilities;
