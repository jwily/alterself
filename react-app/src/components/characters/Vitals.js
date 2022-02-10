import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import BlueBox from "../../global/BlueBox";


const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Container = styled.div`

    margin: 1rem;
    // width: 15rem;
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
        height: .5rem;
        width: 100%;
        background-color: rgba(51, 48, 47, .75);
        border-top: 1px solid dimgrey;
        border-left: 1px solid dimgrey;
        border-bottom: 1px solid silver;
        border-right: 1px solid silver;
        margin-top: .25rem;
        margin-bottom: .5rem;
    }

    .hp-bar {
        display: flex;
        justify-content: right;
        width: 70%;
        height: .5rem;
        // background-color: green;
        background: rgb(141,255,128);
        background: -moz-linear-gradient(180deg, rgba(141,255,128,1) 0%, rgba(19,185,0,1) 50%);
        background: -webkit-linear-gradient(180deg, rgba(141,255,128,1) 0%, rgba(19,185,0,1) 50%);
        background: linear-gradient(180deg, rgba(141,255,128,1) 0%, rgba(19,185,0,1) 50%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#8dff80",endColorstr="#13b900",GradientType=1);
    }

    .hp-temp-bar {
        width: 45%;
        height: .5rem;
        // background-color: goldenrod;
        background: rgb(128,215,255);
        background: -moz-linear-gradient(180deg, rgba(128,215,255,1) 0%, rgba(0,125,184,1) 50%);
        background: -webkit-linear-gradient(180deg, rgba(128,215,255,1) 0%, rgba(0,125,184,1) 50%);
        background: linear-gradient(180deg, rgba(128,215,255,1) 0%, rgba(0,125,184,1) 50%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#80d7ff",endColorstr="#007db8",GradientType=1);

        align-self: flex-end;
    }
`

const Vitals = ({ charData, fadeNum }) => {

    const card = useRef(null)
    const hpContainer = useRef(null);

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    useEffect(() => {

    }, [charData.hpMax, charData.hpCurr, charData.hpTemp])

    const theme = useSelector(state => state.theme.selection)

    return (

        <BlueBox className="vitals" theme={theme} ref={card}>
            <Container >
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
                    <div className='hp-container' ref={hpContainer}>
                        <div className='hp-bar'>
                            <div className='hp-temp-bar'></div>
                        </div>
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
