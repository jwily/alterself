import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faGuitar,
    faReply
} from '@fortawesome/free-solid-svg-icons';

import BlueBox from "../../global/BlueBox";
import ProfCard from './ProfCard'
import CreateProf from "./CreateProf";

const Container = styled.div`

    margin: 1rem;
    width: 17.5rem;

    h2 {
        font-size: 1.25rem;
    }

    #proficiencies-title {
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

    .prof-reveal {
        width: fit-content;
        background-color: transparent;
        border: 0;
        color: whitesmoke;
        padding: .5rem;
        border-radius: .5rem;
        font-family: 'Inconsolata', monospace;
        cursor: pointer;
    }

    .prof-reveal:active {
        background-color: rgba(51, 48, 47, 0.25);
    }

    .prof-reveal:hover {
        color: #ffcd00;
    }
`

const Proficiencies = ({ fadeNum }) => {

    const { charId } = useParams();

    const order = useSelector(state => state.characters.entities[charId].profsById)
    const data = useSelector(state => state.profs);
    const theme = useSelector(state => state.theme.selection);

    const [add, setAdd] = useState(false);

    const card = useRef(null)

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            card.current.style.opacity = 1;
        }, 100 + (fadeNum * 50));
        return () => {
            clearTimeout(fadeIn)
        };
    }, [fadeNum])

    const profCards = useMemo(() => {
        return order.map(id => {
            const prof = data[id];
            return prof ? <ProfCard key={prof.id} prof={prof} /> : null
        })
    }, [data, order])

    return (
        <BlueBox className="profs" theme={theme} ref={card}>
            <Container>
                <div id="proficiencies-title">
                    <h2>
                        {!add && 'Proficiencies'}
                        {add && "What have you mastered?"}
                    </h2>
                    <button type="button" onClick={() => setAdd(!add)}>
                        {!add &&
                            <>
                                <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faGuitar} />
                            </>}
                        {add && <FontAwesomeIcon icon={faReply} />}
                    </button>
                </div>
                {add && <CreateProf setAdd={setAdd} />}
                <ul>{profCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default Proficiencies
