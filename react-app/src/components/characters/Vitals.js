import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import debounce from "lodash/debounce"
import { useSelector } from "react-redux";

import BlueBox from "../../global/BlueBox";


const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Container = styled.div`

    margin: 1rem;
    display: flex;
    flex-direction: row;

    h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    ul {
        margin-bottom: .5rem;
    }

    li {
        margin-bottom: .25rem;
    }

    .vitals-left{
        width: 50%;
    }

    .vitals-right {
        width: 50%;
        padding-right: .5rem;
    }

    .hp-container {
        box-sizing: content-box;
        display: flex;
        justify-content: space-between;
        height: .5rem;
        width: 100%;
        background-color: rgba(51, 48, 47, .75);
        margin-top: .25rem;
        margin-bottom: .5rem;

        ${(props) => props.theme === 'dragon' ?

        'border: 1px solid silver;' :

        `
        border-top: 1px solid dimgrey;
        border-left: 1px solid dimgrey;
        border-bottom: 1px solid silver;
        border-right: 1px solid silver;
        `}
    }

    .hp-bar {
        width: 25%;
        height: .5rem;
        background-color: firebrick;
    }

    .hp-temp-bar {
        width: 30%;
        height: .5rem;
        background-color: skyblue;
        align-self: flex-end;
    }
`

const Vitals = ({ charData, fadeNum }) => {

    const card = useRef(null)

    const [changed, setChanged] = useState(false);

    const [level, setLevel] = useState(charData.level);
    const [hpCurr, setHPCurr] = useState(charData.hpCurr);
    const [hpMax, setHPMax] = useState(charData.hpMax);
    const [hpTemp, setHPTemp] = useState(charData.hpTemp);
    const [ac, setAC] = useState(charData.armor);
    const [speed, setSpeed] = useState(charData.speed);
    const [hdCurr, setHDCurr] = useState(charData.hdCurr);
    const [hdMax, setHDMax] = useState(charData.hdMax);


    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    const theme = useSelector(state => state.theme.selection)

    return (

        <BlueBox className="vitals" theme={theme} ref={card}>
            <Container theme={theme}>
                <div className='vitals-left'>
                    <div>
                        <h1>{charData.name}</h1>
                        <ul>
                            <li>Level {charData.level} {charData.class}</li>
                            <li>{charData.race} {charData.background}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>Armor Class {10 + modCalc(charData.dex)}</li>
                            <li>Movement Speed {charData.speed}</li>
                        </ul>
                    </div>
                </div>
                <div className='vitals-right'>
                    <div className='hp-container' theme={theme}>
                        <div className='hp-bar'>
                        </div>
                        <div className='hp-temp-bar'></div>
                    </div>
                    <ul>
                        <li>Current / Max HP:</li>
                        <li>Temporary HP:</li>
                    </ul>
                </div>
            </Container>
        </BlueBox>

    )

}


export default Vitals
