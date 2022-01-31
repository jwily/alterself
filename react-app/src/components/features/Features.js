import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faCrown,
    faReply
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";
import FeatCard from "./FeatCard";
import CreateFeat from "./CreateFeat";

const Container = styled.div`

    margin: 1rem;
    width: 17.5rem;

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

const FeaturesAndTraits = ({ fadeNum }) => {

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 100));
        return () => clearTimeout(fadeIn);
    }, [fadeNum])

    const data = useSelector(state => state.features);
    const theme = useSelector(state => state.theme.selection);

    const [add, setAdd] = useState(false);

    const featCards = useMemo(() => {
        return data.ids.map(id => {
            const feat = data.entities[id];
            return <FeatCard key={feat.id} feat={feat} />
        })
    }, [data.entities, data.ids])

    return (
        <BlueBox className="feats" theme={theme} ref={card}>
            <Container>
                <div id="features-title">
                    <h2>
                        {!add && 'Features and Traits'}
                        {add && "What makes you strong?"}
                    </h2>
                    <button type="button" onClick={() => setAdd(!add)}>
                        {!add &&
                            <>
                                <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faCrown} />
                            </>}
                        {add && <FontAwesomeIcon icon={faReply} />}
                    </button>
                </div>
                {add && <CreateFeat setAdd={setAdd} />}
                <ul>{featCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default FeaturesAndTraits
