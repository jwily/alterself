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

    h1 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }

    li {
        margin-bottom: .25rem;
    }

    div {
        margin-bottom: .5rem;
    }
`
const VitalsLi = styled.li`

    display: flex;
    justify-content: space-between;
    margin-top: .25rem;
    margin-right: .5rem;
`

const Vitals = ({ charData, fadeNum }) => {

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    const theme = useSelector(state => state.theme.selection)

    return (

        <BlueBox className="vitals" theme={theme} ref={card}>
            <Container >
                <h1>{charData.name}</h1>
                <ul>
                    <div>
                        <li>
                            Level {charData.level} {charData.class}
                        </li>
                        <li>
                            {charData.race} {charData.background}
                        </li>
                    </div>
                    <div>
                        <li>
                            Armor Class {10 + modCalc(charData.dex)}
                        </li>
                        <li>
                            Movement Speed {charData.speed} ft
                        </li>
                    </div>
                </ul>
            </Container>
        </BlueBox>

    )

}


export default Vitals
