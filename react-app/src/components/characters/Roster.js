import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CreateCharModal from "./CreateCharModal";
import CharCard from "./CharCard";
import UploadPicture from "./UploadPicture";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2.5rem;

    ul {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: repeat(4, min-content);
        grid-template-rows: auto;
    }

    h1 {
        font-size: 3.5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }

    h2 {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
    }

    .roster-fa {
        margin-right: .25rem;
    }
`

const Roster = ({ dataLoaded }) => {

    const data = useSelector(state => state.characters);
    const user = useSelector(state => state.session.user)
    const [memoCount, setMemoCount] = useState(0)

    const charCards = useMemo(() => {
        setMemoCount(count => count + 1);
        console.log(`Memo Activated x ${memoCount}`);
        return data.ids.map((id, idx) => {
            const char = data.entities[id];
            return <CharCard key={char.id} char={char} idx={idx} ids={data.ids} />
        })
    }, [data.entities, data.ids])

    return (
        <Container>
            <h1>Dive into an altered self</h1>
            <h2>Hope you're well, {user.name}</h2>
            <CreateCharModal />
            <UploadPicture />
            <ul>
                {dataLoaded && charCards}
            </ul>
        </Container>
    )
}

export default Roster;
