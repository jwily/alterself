import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import BlueBox from "../../global/BlueBox";


const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Container = styled.div`

    margin: 1rem;
    width: 15rem;

    h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }
`

const SavingLi = styled.li`

    display: flex;
    justify-content: space-between;
    margin-top: .25rem;
    margin-right: .5rem;
`

const SavingThrows = ({ charData, fadeNum }) => {

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 100));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])
    const theme = useSelector(state => state.theme.selection)

    return (

        <BlueBox className="throws" theme={theme} ref={card}>
            <Container >
                <h2>Saving Throws</h2>
                <ul>
                    <SavingLi>
                        <div>Strength</div>
                        <div>{modCalc(charData.str) >= 0 ? `+ ${modCalc(charData.str)}` : `- ${Math.abs(modCalc(charData.str))}`}</div>
                    </SavingLi>
                    <SavingLi>
                        <div>Dexterity</div>
                        <div>{modCalc(charData.dex) >= 0 ? `+ ${modCalc(charData.dex)}` : `- ${Math.abs(modCalc(charData.dex))}`}</div>
                    </SavingLi>
                    <SavingLi>
                        <div>Constitution</div>
                        <div>{modCalc(charData.con) >= 0 ? `+ ${modCalc(charData.con)}` : `- ${Math.abs(modCalc(charData.con))}`}</div>
                    </SavingLi>
                    <SavingLi>
                        <div>Intelligence</div>
                        <div>{modCalc(charData.int) >= 0 ? `+ ${modCalc(charData.int)}` : `- ${Math.abs(modCalc(charData.int))}`}</div>
                    </SavingLi>
                    <SavingLi>
                        <div>Wisdom</div>
                        <div>{modCalc(charData.wis) >= 0 ? `+ ${modCalc(charData.wis)}` : `- ${Math.abs(modCalc(charData.wis))}`}</div>
                    </SavingLi>
                    <SavingLi>
                        <div>Charisma</div>
                        <div>{modCalc(charData.cha) >= 0 ? `+ ${modCalc(charData.cha)}` : `- ${Math.abs(modCalc(charData.cha))}`}</div>
                    </SavingLi>
                </ul>
            </Container>
        </BlueBox>

    )

}


export default SavingThrows
