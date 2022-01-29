import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce"
import { useDispatch } from "react-redux";
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

import BlueBox from "../../global/BlueBox";

const Container = styled.form`
    width: 10rem;
`
const AbilityDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;

    .mod {
        font-size: 1.25rem;
        margin: .75rem;
        width: 3.75rem;
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
        color: gold;
        text-align: center;
    }

    text-align: center;
`

const modCalc = (score) => {
    return Math.floor((score - 10) / 2)
}

const modDisplay = (score) => {
    if (score > 20) return '+ 5';
    else if (score < 0) return '- 5'
    const mod = modCalc(score);
    if (mod >= 0) return `+ ${mod}`
    else return `- ${Math.abs(mod)}`;
}

const Abilities = ({ charData }) => {

    const dispatch = useDispatch()

    const [changed, setChanged] = useState(false);

    const [str, setStr] = useState(charData.str);
    const [dex, setDex] = useState(charData.dex);
    const [con, setCon] = useState(charData.con);
    const [int, setInt] = useState(charData.int);
    const [wis, setWis] = useState(charData.wis);
    const [cha, setCha] = useState(charData.cha);

    const debouncedSave = useCallback(
        debounce(async (data) => {
            await dispatch(editAbilities(data));
            console.log('Saved!')
        }, 250),
        [],
    );

    useEffect(() => {
        const data = {
            charId: charData.id,
            strength: parseInt(str, 10),
            dexterity: parseInt(dex, 10),
            constitution: parseInt(con, 10),
            intelligence: parseInt(int, 10),
            wisdom: parseInt(wis, 10),
            charisma: parseInt(cha, 10),
        }
        if (changed) debouncedSave(data);
    }, [debouncedSave, charData.id, str, dex, con, int, wis, cha, changed])

    const handleBlur = (e, func) => {
        if (e.target.value > 20) {
            func(20);
        } else if (e.target.value < 0 || !e.target.value) {
            func(0);
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
        <BlueBox className="abilities">
            <Container>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-str`}>
                        <span>Strength</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faFistRaised} />
                            <span>{modDisplay(str)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-str`} type="number" value={str}
                        onBlur={(e) => handleBlur(e, setStr)}
                        onChange={changeStr} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-dex`}>
                        <span>Dexterity</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPaper} />
                            <span>{modDisplay(dex)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-dex`} type="number" value={dex}
                        onBlur={(e) => handleBlur(e, setDex)}
                        onChange={changeDex} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-con`}>
                        <span>Constitution</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingWater} />
                            <span>{modDisplay(dex)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-con`} type="number" value={con}
                        onBlur={(e) => handleBlur(e, setCon)}
                        onChange={changeCon} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-int`}>
                        <span>Intelligence</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandSpock} />
                            <span>{modDisplay(int)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-int`} type="number" value={int}
                        onBlur={(e) => handleBlur(e, setInt)}
                        onChange={changeInt} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-wis`}>
                        <span>Wisdom</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                            <span>{modDisplay(wis)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-wis`} type="number" value={wis}
                        onBlur={(e) => handleBlur(e, setWis)}
                        onChange={changeWis} />
                </AbilityDiv>
                <AbilityDiv>
                    <label htmlFor={`${charData.id}-cha`}>
                        <span>Charisma</span>
                        <div className="mod">
                            <FontAwesomeIcon icon={faHandPeace} />
                            <span>{modDisplay(cha)}</span>
                        </div>
                    </label>
                    <input max="20" min="0" id={`${charData.id}-cha`} type="number" value={cha}
                        onBlur={(e) => handleBlur(e, setCha)}
                        onChange={changeCha} />
                </AbilityDiv>
            </Container>
        </BlueBox>
    )
}

export default Abilities;
