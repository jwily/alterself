import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce"
import { useDispatch, useSelector } from "react-redux";
import { editAbilities } from "../../store/characters";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFistRaised,
    faHandPaper,
    faHandHoldingWater,
    faHandSpock,
    faHandHoldingHeart,
    faHandPeace
} from '@fortawesome/free-solid-svg-icons';

import { setErrors } from "../../store/help";

import BlueBox from "../../global/BlueBox";

const Container = styled.form`
    width: 10rem;
`
const AbilityDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.25rem 1rem;

    .mod {
        font-size: 1.25rem;
        margin: .75rem;
        width: 4.5rem;
        display: flex;
        justify-content: space-between;
    }

    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    input {
        width: 4rem;
        padding-left: 1.25rem;
        color: #ffcd00;
        text-align: center;
    }

    text-align: center;
`

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const modDisplay = (score) => {
    if (score > 99) return '+ 44';
    else if (score < 0) return '- 5';
    const mod = modCalc(score);
    if (mod >= 0) return `+ ${mod}`
    else return `- ${Math.abs(mod)}`;
}

const Abilities = ({ charData, fadeNum, setHover }) => {

    const dispatch = useDispatch()

    const theme = useSelector(state => state.theme.selection)

    const [changed, setChanged] = useState(false);

    const [str, setStr] = useState(charData.str);
    const [dex, setDex] = useState(charData.dex);
    const [con, setCon] = useState(charData.con);
    const [int, setInt] = useState(charData.int);
    const [wis, setWis] = useState(charData.wis);
    const [cha, setCha] = useState(charData.cha);

    const debouncedSave = useCallback(
        debounce(async (data) => {
            const response = await dispatch(editAbilities(data));
            if (response) {
                dispatch(setErrors(response))
            }
        }, 350),
        [],
    );

    const card = useRef(null)

    const dataOkay = useMemo(() => {
        const scores = [str, dex, con, int, wis, cha];
        for (let i = 0; i < 6; i++) {
            const score = scores[i];
            if (score < 0 || score > 99) {
                return false;
            }
        }
        return true;
    }, [str, dex, con, int, wis, cha])

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
                strength: parseInt(str, 10) || 0,
                dexterity: parseInt(dex, 10) || 0,
                constitution: parseInt(con, 10) || 0,
                intelligence: parseInt(int, 10) || 0,
                wisdom: parseInt(wis, 10) || 0,
                charisma: parseInt(cha, 10) || 0,
            }
            debouncedSave(data);
        }
    }, [debouncedSave, charData.id, str, dex, con, int, wis, cha, changed])

    const handleBlur = (e, setFunc, currVal) => {
        if (!dataOkay) {
            setFunc(currVal);
        }
        if (!e.target.value) {
            setFunc(0);
        }
    };

    const changeStr = (e) => {
        setChanged(true);
        setStr(e.target.value);
    };

    const changeDex = (e) => {
        setChanged(true);
        setDex(e.target.value);
    };

    const changeCon = (e) => {
        setChanged(true);
        setCon(e.target.value);
    };

    const changeInt = (e) => {
        setChanged(true);
        setInt(e.target.value);
    };

    const changeWis = (e) => {
        setChanged(true);
        setWis(e.target.value);
    };

    const changeCha = (e) => {
        setChanged(true);
        setCha(e.target.value);
    };

    return (
        <BlueBox className="abilities" theme={theme} ref={card}>
            <Container>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('str'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('str')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-str`}>
                        <span>Strength</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faFistRaised} />
                            <span>{modDisplay(charData.str)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-str`} type="number" value={str}
                        onBlur={(e) => handleBlur(e, setStr, charData.str)}
                        onChange={changeStr} />
                </AbilityDiv>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('dex'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('dex')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-dex`}>
                        <span>Dexterity</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPaper} />
                            <span>{modDisplay(charData.dex)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-dex`} type="number" value={dex}
                        onBlur={(e) => handleBlur(e, setDex, charData.dex)}
                        onChange={changeDex} />
                </AbilityDiv>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('con'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('con')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-con`}>
                        <span>Constitution</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingWater} />
                            <span>{modDisplay(charData.con)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-con`} type="number" value={con}
                        onBlur={(e) => handleBlur(e, setCon, charData.con)}
                        onChange={changeCon} />
                </AbilityDiv>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('int'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('int')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-int`}>
                        <span>Intelligence</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandSpock} />
                            <span>{modDisplay(charData.int)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-int`} type="number" value={int}
                        onBlur={(e) => handleBlur(e, setInt, charData.int)}
                        onChange={changeInt} />
                </AbilityDiv>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('wis'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('wis')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-wis`}>
                        <span>Wisdom</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                            <span>{modDisplay(charData.wis)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-wis`} type="number" value={wis}
                        onBlur={(e) => handleBlur(e, setWis, charData.wis)}
                        onChange={changeWis} />
                </AbilityDiv>
                <AbilityDiv
                    // onMouseEnter={() => dispatch(setHover('cha'))}
                    // onMouseLeave={() => dispatch(setHover(''))}
                    onMouseEnter={() => setHover('cha')}
                    onMouseLeave={() => setHover('')}
                >
                    <label htmlFor={`${charData.id}-cha`}>
                        <span>Charisma</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPeace} />
                            <span>{modDisplay(charData.cha)}</span>
                        </div>
                    </label>
                    <input max="99" min="0" id={`${charData.id}-cha`} type="number" value={cha}
                        onBlur={(e) => handleBlur(e, setCha, charData.cha)}
                        onChange={changeCha} />
                </AbilityDiv>
            </Container>
        </BlueBox>
    )
}

export default Abilities;
