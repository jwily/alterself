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
    margin-bottom: .25rem;
    margin-right: .5rem;

    ${props => props.hover && `
    color: #ffcd00;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    background-color: rgba(51, 48, 47, 0.15);
    `}
    transition: all .5s;
`

const SavingThrows = ({ charData, fadeNum, hover }) => {

    // const hoverState = useSelector(state => state.help.hover);

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => {
            clearTimeout(fadeIn)
        };
    }, [fadeNum])
    const theme = useSelector(state => state.theme.selection)

    return (

        <BlueBox className="throws" theme={theme} ref={card}>
            <Container >
                <h2>Saving Throws</h2>
                <ul>
                    <SavingLi hover={hover === 'str'}>
                        <div>Strength</div>
                        <div>{modCalc(charData.str) >= 0 ? `+ ${modCalc(charData.str)}` : `- ${Math.abs(modCalc(charData.str))}`}</div>
                    </SavingLi>
                    <SavingLi hover={hover === 'dex'}>
                        <div>Dexterity</div>
                        <div>{modCalc(charData.dex) >= 0 ? `+ ${modCalc(charData.dex)}` : `- ${Math.abs(modCalc(charData.dex))}`}</div>
                    </SavingLi>
                    <SavingLi hover={hover === 'con'}>
                        <div>Constitution</div>
                        <div>{modCalc(charData.con) >= 0 ? `+ ${modCalc(charData.con)}` : `- ${Math.abs(modCalc(charData.con))}`}</div>
                    </SavingLi>
                    <SavingLi hover={hover === 'int'}>
                        <div>Intelligence</div>
                        <div>{modCalc(charData.int) >= 0 ? `+ ${modCalc(charData.int)}` : `- ${Math.abs(modCalc(charData.int))}`}</div>
                    </SavingLi>
                    <SavingLi hover={hover === 'wis'}>
                        <div>Wisdom</div>
                        <div>{modCalc(charData.wis) >= 0 ? `+ ${modCalc(charData.wis)}` : `- ${Math.abs(modCalc(charData.wis))}`}</div>
                    </SavingLi>
                    <SavingLi hover={hover === 'cha'}>
                        <div>Charisma</div>
                        <div>{modCalc(charData.cha) >= 0 ? `+ ${modCalc(charData.cha)}` : `- ${Math.abs(modCalc(charData.cha))}`}</div>
                    </SavingLi>
                </ul>
            </Container>
        </BlueBox>

    )

}


export default SavingThrows
