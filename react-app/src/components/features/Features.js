import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CreateFeat from "./CreateFeat";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faMedal,
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";
import FeatCard from "./FeatCard";

const Container = styled.div`

    margin: 1rem;
    width: 20rem;

    h2 {
        font-size: 1.25rem;
    }

    #features-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        margin-bottom: .5rem;
        height: 1.5rem;
    }

    li {
        margin-top: .25rem;
    }

    .feat-reveal {
        width: fit-content;
        background-color: transparent;
        border: 0;
        color: whitesmoke;
        padding: .5rem;
        border-radius: .5rem;
        font-family: 'Inconsolata', monospace;
        cursor: pointer;
    }

    .feat-reveal:active {
        background-color: rgba(51, 48, 47, 0.25);
    }

    .feat-reveal:hover {
        color: gold;
    }
`

const FeaturesAndTraits = () => {

    const data = useSelector(state => state.features)

    const [mode, setMode] = useState('base');

    const featCards = useMemo(() => {
        return data.ids.map(id => {
            const feat = data.entities[id];
            return <FeatCard key={feat.id} feat={feat} setMode={setMode} />
        })
    }, [data.entities, data.ids])

    return (
        <BlueBox className="feats">
            <Container>
                <div id="features-title">
                    <h2>
                        {mode === 'base' && 'Features and Traits'}
                        {mode === 'add' && 'What makes you a hero?'}
                    </h2>
                    {mode === 'base' && <button type="button" onClick={() => setMode('add')}>
                        <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faMedal} />
                    </button>}
                </div>
                {mode === 'add' && <CreateFeat setMode={setMode} />}
                <ul>{featCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default FeaturesAndTraits
