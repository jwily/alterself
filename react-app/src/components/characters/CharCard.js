import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteChar } from "../../store/characters";
import BlackBox from "../../global/BlackBox";

const Card = styled.li`
    margin: 1rem;
    a {
        color: gold;
    }

    width: 15rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    .roster-info {
        // background: black;
        // border: 2px solid silver;
        // border-radius: .5rem;
        padding: 1rem;
        width: 12.5rem;
    }

    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));

    // &:hover {
    //     filter: drop-shadow(0 0 5px rgba(212, 175, 55, .75));
    // }
`

const Icon = styled.div`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    border-radius: 10rem;
    margin-bottom: 1.5rem;
    // filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));;
    background-color: ${props => props.color};
`

const CharCard = ({ char, idx }) => {

    const dispatch = useDispatch();

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <Card key={idx}>
            <Icon className="roster-icon" color={`rgb(${(char.str + char.con) * 5}, ${(char.dex + char.cha) * 5}, ${(char.int + char.wis) * 5})`}>
                {char.name[0]}
            </Icon>
            <BlackBox>
                <div className="roster-info">
                    <Link to={`/roster/${char.id}`}>{char.name}</Link>
                    <p>Level {char.level} {char.class}</p>
                    <p>{char.race}</p>
                    <form onSubmit={(e) => handleDelete(e, char.id)}>
                        <button type='submit'>Delete</button>
                    </form>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
