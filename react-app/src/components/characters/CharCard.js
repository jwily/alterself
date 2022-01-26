import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteChar } from "../../store/characters";

const Card = styled.li`
    margin: 1rem;
    a {
        color: gold;
    }
`

const CharCard = ({ char, idx }) => {

    const dispatch = useDispatch();

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <Card key={idx}>
            <Link to={`/roster/${char.id}`}>{char.name}</Link>
            <p>{char.race}</p>
            <p>Level {char.level} {char.class}</p>
            <form onSubmit={(e) => handleDelete(e, char.id)}>
                <button type='submit'>Delete</button>
            </form>
        </Card>
    )
}

export default CharCard;
