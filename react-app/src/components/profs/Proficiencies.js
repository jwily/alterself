import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faGuitar,
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
        color: gold;
    }
`

const Proficiencies = () => {

    const data = useSelector(state => state.profs)

    const [mode, setMode] = useState('base');

    const profCards = useMemo(() => {
        return data.ids.map(id => {
            const prof = data.entities[id];
            return <ProfCard key={prof.id} prof={prof} setMode={setMode} />
        })
    }, [data.entities, data.ids])

    return (
        <BlueBox className="profs">
            <Container>
                <div id="proficiencies-title">
                    <h2>
                        {mode === 'base' && 'Proficiencies'}
                        {mode === 'add' && "I bet you're good at that"}
                    </h2>
                    {mode === 'base' && <button type="button" onClick={() => setMode('add')}>
                        <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faGuitar} />
                    </button>}
                </div>
                {mode === 'add' && <CreateProf setMode={setMode} />}
                <ul>{profCards}</ul>
            </Container>
        </BlueBox >
    )
}

export default Proficiencies
