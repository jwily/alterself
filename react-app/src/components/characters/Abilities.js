import React, { useState } from "react";
import styled from "styled-components";

import BlueBox from "../../global/BlueBox";

const Container = styled.div`
    width: 10rem;
`

const AbilityDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .5rem;

    input {
        width: 6rem;
        margin-bottom: .5rem;
        font-size: 2.5rem;
        padding-left: 1.5rem;
    }
`

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
                    <input max="20" min="0" id={`${charData.id}-str`} type="number" value={str} onChange={(e) => setStr(e.target.value)} />
                    <label>Strength</label>
                </AbilityDiv>
                <AbilityDiv>
                    <input max="20" min="0" id={`${charData.id}-dex`} type="number" value={dex} onChange={(e) => setDex(e.target.value)} />
                    <label>Dexterity</label>
                </AbilityDiv>
                <AbilityDiv>
                    <input max="20" min="0" id={`${charData.id}-con`} type="number" value={con} onChange={(e) => setCon(e.target.value)} />
                    <label>Constitution</label>
                </AbilityDiv>
                <AbilityDiv>
                    <input max="20" min="0" id={`${charData.id}-int`} type="number" value={int} onChange={(e) => setInt(e.target.value)} />
                    <label>Intelligence</label>
                </AbilityDiv>
                <AbilityDiv>
                    <input max="20" min="0" id={`${charData.id}-wis`} type="number" value={wis} onChange={(e) => setWis(e.target.value)} />
                    <label>Wisdom</label>
                </AbilityDiv>
                <AbilityDiv>
                    <input max="20" min="0" id={`${charData.id}-cha`} type="number" value={cha} onChange={(e) => setCha(e.target.value)} />
                    <label>Charisma</label>
                </AbilityDiv>
            </Container>
        </BlueBox>
    )
}

export default Abilities;
