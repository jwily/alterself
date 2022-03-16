import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { getChar } from "../../store/characters";
import { getItems } from "../../store/items";
import { getSkills } from "../../store/skills";
import { getFeats } from "../../store/features";
import { getProfs } from "../../store/profs";
import { setTheme } from "../../store/theme";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMeteor,
    faLeaf,
    faFeather
} from '@fortawesome/free-solid-svg-icons';

import BlackBox from "../../global/BlackBox";
import Abilities from "./Abilities";
import Inventory from "../items/Inventory";
import FeaturesAndTraits from "../features/Features";
import Proficiencies from "../profs/Proficiencies";
import Skills from "./Skills";
import SavingThrows from "./SavingThrows";
import Vitals from "./Vitals";

import { setHide } from "../../store/help";
import { setHover } from "../../store/help";
import { unmountAll } from "../../store/characters";

import scholar from '../../images/scholar.png';

const Parent = styled.div`

    .loading-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    }
`

const Container = styled.div`

    margin-top: 1.5rem;
    margin-left: 1.5rem;

    display: grid;
    grid-template-columns: repeat(4, min-content);
    grid-template-rows: min-content min-content 1fr;

    .vitals {
        margin-bottom: 1rem;
        margin-left: 1rem;

        grid-column-start: 3;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .abilities {
        margin-right: 1rem;

        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .throws {
        margin-bottom: 1rem;

        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
    }

    .skills {

        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .profs-feats {
        height: min-content;

        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 4;

        margin-bottom: 1rem;
    }

    .profs {
        margin-left: 1rem;
        margin-bottom: 1rem;
    }

    .feats {
        margin-left: 1rem;
    }

    .items {
        margin-left: 1rem;
        height: min-content;
        margin-bottom: 1rem;

        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 4;
    }
`

const ThemeButtons = styled.div`

    position: fixed;
        right: 0;
        bottom: 0;

    margin-bottom: 1rem;
    margin-right: 6.75rem;

    button {
        font-size: 1rem;
        background-color: transparent;
        border: none;
        color: whitesmoke;
        opacity: .25;
        cursor: pointer;
        margin-left: .5rem;
    }

    button:hover, button.selected {
        opacity: .75;
    }
`

const ScholarDiv = styled.div`

    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;

    .scholar-title {
        margin-bottom: .5rem;
    }

    .scholar-errors {
        width: 27.5rem;
        padding: 1rem;
        background: rgba(20, 20, 20, .75);
        margin-right: 1.5rem;
    }

    .scholar-close-text {
        color: grey;
        font-size: .85rem;
        margin-top: 1rem;
    }

    .scholar-text > div {
        margin-bottom: .5rem;
    }

    .scholar {
        align-self: end;

        background-image: url(${scholar});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 5rem;
        height: 5rem;

        border: none;
        background-color: transparent;
        margin-bottom: 1rem;
        margin-right: 1rem;
        margin-top: .5rem;
    }
`

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const Character = () => {
    const { charId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [badId, setBadId] = useState(false);
    const [array] = useState([0, 1, 2, 3, 4, 5, 6])

    const dispatch = useDispatch();

    const randomized = useMemo(() => shuffle(array), [array])

    useEffect(() => {
        dispatch(unmountAll())
        dispatch(setHide(true));
        dispatch(setHover(''));
    }, [dispatch])

    useEffect(() => {
        (async () => {
            if (isNaN(parseInt(charId, 10))) {
                setBadId(true);
                return;
            }
            const char = await dispatch(getChar(charId));
            if (char) {
                await dispatch(getSkills(charId));
                await dispatch(getItems(charId));
                await dispatch(getProfs(charId));
                await dispatch(getFeats(charId));
                setIsLoaded(true);
            } else {
                setBadId(true);
            }
        })();
    }, [dispatch, charId])

    const charData = useSelector(state => state.characters.entities.character)
    const helpData = useSelector(state => state.help)
    const theme = useSelector(state => state.theme.selection)

    if (badId) return (
        <Redirect to='/' />
    )

    return (
        <Parent>
            {!isLoaded &&
                <div className="loading-message">Loading...</div>
            }
            <Container>
                {isLoaded &&
                    <>
                        <Vitals charData={charData} fadeNum={randomized[0]} />

                        <Abilities charData={charData} fadeNum={randomized[1]} />

                        <SavingThrows charData={charData} fadeNum={randomized[2]} />

                        <Skills charData={charData} fadeNum={randomized[3]} />

                        <div className="profs-feats">
                            <Proficiencies fadeNum={randomized[4]} />
                            <FeaturesAndTraits fadeNum={randomized[5]} />
                        </div>

                        <Inventory fadeNum={randomized[6]} />
                    </>}

                <ThemeButtons>
                    {theme === 'dragon' ?
                        <button type="button" onClick={() => dispatch(setTheme("default"))} className="selected"><FontAwesomeIcon icon={faLeaf} /></button> :
                        <button type="button" onClick={() => dispatch(setTheme("dragon"))}><FontAwesomeIcon icon={faLeaf} /></button>}
                    {theme === 'meteor' ?
                        <button type="button" onClick={() => dispatch(setTheme("default"))} className="selected"><FontAwesomeIcon icon={faMeteor} /></button> :
                        <button type="button" onClick={() => dispatch(setTheme("meteor"))}><FontAwesomeIcon icon={faMeteor} /></button>}
                    {theme === 'lion' ?
                        <button type="button" onClick={() => dispatch(setTheme("default"))} className="selected"><FontAwesomeIcon icon={faFeather} /></button> :
                        <button type="button" onClick={() => dispatch(setTheme("lion"))}><FontAwesomeIcon icon={faFeather} /></button>}
                </ThemeButtons>

                <ScholarDiv>
                    {helpData.show && <BlackBox className="scholar-errors" onMouseEnter={() => dispatch(setHide())}>
                        <div className="scholar-title">The Scholar says:</div>
                        <div className="scholar-text">
                            {helpData.errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="scholar-close-text">Mouse over to dismiss</div>
                    </BlackBox>}
                    <button className="scholar" type="button"></button>
                </ScholarDiv>
            </Container>
        </Parent>
    )
}

export default Character;
