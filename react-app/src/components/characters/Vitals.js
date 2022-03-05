import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce"
import { useSelector, useDispatch } from "react-redux";

import BlueBox from "../../global/BlueBox";

import { setErrors } from "../../store/help";
import { editVitals } from "../../store/characters";

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const Container = styled.div`
    margin: 1rem;

    form {
        display: flex;
        flex-direction: row;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: .5rem;
    }

    ul {
        margin-bottom: .75rem;
    }

    li {
        margin-bottom: .25rem;
    }

    .def-stats label {
        width: 8.5rem;
        display: inline-block;
    }

    .vitals-left{
        width: 50%;
    }

    .vitals-right {
        width: 50%;
        padding-right: .5rem;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        ul {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        label {
            font-size: .85rem;
        }
    }

    .hp-container {
        box-sizing: content-box;
        // display: flex;
        // justify-content: space-between;
        display: grid;
        height: .5rem;
        width: 100%;
        background-color: rgba(51, 48, 47, .75);
        margin-top: .5rem;
        margin-bottom: .75rem;

        ${(props) => props.theme === 'dragon' ?

        'border: 1px solid silver;' :

        `
        border-top: 1px solid dimgrey;
        border-left: 1px solid dimgrey;
        border-bottom: 1px solid silver;
        border-right: 1px solid silver;
        `}
    }

    input {
    color: #ffcd00;
    width: 3.5rem;
    }

    #hp-title {
    margin-top: .5rem;
    }

    #char-level {
        font-size: 1rem;
`

const LifeBar = styled.div`
    width: ${(props) => props.width}%;
    height: .5rem;
    ${(props) => props.width > 50 && 'background-color: yellowgreen;'}
    ${(props) => props.width <= 50 && props.width > 25 && 'background-color: goldenrod;'}
    ${(props) => props.width <= 25 && 'background-color: firebrick;'}
    transition: all .5s;
    grid-area: 1 / 1;
`

const ShieldBar = styled.div`
    width: ${(props) => props.width}%;
    height: .5rem;
    background-color: slateblue;
    transition: all .5s;
    grid-area: 1 / 1;
    // justify-self: end;
`

const Vitals = ({ charData, fadeNum }) => {

    const dispatch = useDispatch();

    const card = useRef(null)

    const [changed, setChanged] = useState(false);

    // const [level, setLevel] = useState(charData.level);
    const [hpCurr, setHPCurr] = useState(charData.hpCurr);
    const [hpMax, setHPMax] = useState(charData.hpMax);
    const [hpTemp, setHPTemp] = useState(charData.hpTemp);
    // const [ac, setAC] = useState(charData.armor);
    // const [speed, setSpeed] = useState(charData.speed);
    // const [hdCurr, setHDCurr] = useState(charData.hdCurr);
    // const [hdMax, setHDMax] = useState(charData.hdMax);

    const debouncedSave = useCallback(
        debounce(async (data) => {
            const response = await dispatch(editVitals(data));
            if (response) {
                dispatch(setErrors(response))
            }
        }, 350),
        [],
    );

    const lifePercent = useMemo(() => {
        const percent = parseInt(charData.hpCurr / charData.hpMax * 100, 10);
        return percent >= 100 ? 100 : percent;
    }, [charData.hpCurr, charData.hpMax])

    const shieldPercent = useMemo(() => {
        const percent = parseInt(charData.hpTemp / charData.hpMax * 100, 10);
        return percent >= 100 ? 100 : percent;
    }, [charData.hpTemp, charData.hpMax])

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => {
            clearTimeout(fadeIn)
        };
    }, [fadeNum])

    useEffect(() => {
        if (changed) {
            const data = {
                charId: charData.id,
                hpCurr: parseInt(hpCurr, 10) || 0,
                hpMax: parseInt(hpMax, 10) || 0,
                hpTemp: parseInt(hpTemp, 10) || 0,
            }
            debouncedSave(data);
        }
    }, [debouncedSave, charData.id, hpCurr, hpMax, hpTemp, changed])


    // const changeAC = (e) => {
    //     setChanged(true);
    //     setAC(e.target.value);
    // };

    // const changeSpeed = (e) => {
    //     setChanged(true);
    //     setSpeed(e.target.value);
    // };

    const changeHP = (e) => {
        setChanged(true);
        setHPCurr(e.target.value);
    };

    const changeMax = (e) => {
        setChanged(true);
        setHPMax(e.target.value);
    };

    const changeTemp = (e) => {
        setChanged(true);
        setHPTemp(e.target.value);
    };

    // const changeLevel = (e) => {
    //     setChanged(true);
    //     setLevel(e.target.value);
    // };

    const handleBlur = (e, setFunc, value) => {
        if (e.target.value < 0) {
            setFunc(value);
        } else if (!e.target.value) {
            setFunc(0);
        }
    };

    const theme = useSelector(state => state.theme.selection)

    return (
        <BlueBox className="vitals" theme={theme} ref={card}>
            <Container theme={theme}>
                <form autoComplete="off">
                    <div className='vitals-left'>
                        <div>
                            <h1>{charData.name}</h1>
                            <ul>
                                <li>
                                    <label htmlFor="char-level">Level </label>
                                    <span>{charData.level} {charData.class}</span>
                                    {/* <input id="char-level" value={level} onChange={changeLevel} type="number" /> {charData.class} */}
                                </li>
                                <li>{charData.race} {charData.background}</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="def-stats">
                                <li>
                                    <label htmlFor="char-ac">Armor Class</label>
                                    <span>{modCalc(charData.dex) + 10}</span>
                                    {/* <input id="char-ac" type="number" value={ac} onChange={changeAC} placeholder={modCalc(charData.dex) + 10} /> */}
                                </li>
                                <li>
                                    <label htmlFor="char-speed">Movement Speed</label>
                                    <span>{charData.speed}</span>
                                    {/* <input id="char-speed" type="number" value={speed} onChange={changeSpeed} /> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='vitals-right'>
                        <div id="hp-title">Hit Points</div>
                        <div className='hp-container' theme={theme}>
                            {charData.hpMax > 0 && <>
                                <LifeBar width={lifePercent}></LifeBar>
                                <ShieldBar width={shieldPercent}></ShieldBar>
                            </>}
                        </div>
                        <ul>
                            <li>
                                <label htmlFor="char-hp">Current</label> | <label htmlFor="char-max-hp">Max: </label>
                                <input
                                    id="char-hp"
                                    onChange={changeHP}
                                    value={hpCurr}
                                    type="number"
                                    min="0"
                                    onBlur={(e) => handleBlur(e, setHPCurr, charData.hpCurr)} /> | <input
                                    id="char-max-hp"
                                    min="0"
                                    onChange={changeMax}
                                    value={hpMax}
                                    type="number"
                                    onBlur={(e) => handleBlur(e, setHPMax, charData.hpMax)} />
                            </li>
                            <li>
                                <label htmlFor="char-temp">Temporary: </label>
                                <input
                                    id="char-temp"
                                    onChange={changeTemp}
                                    value={hpTemp}
                                    type="number"
                                    min="0"
                                    onBlur={(e) => handleBlur(e, setHPTemp, charData.hpTemp)} />
                            </li>
                        </ul>
                    </div>
                </form>
            </Container>
        </BlueBox>
    )
}


export default Vitals
