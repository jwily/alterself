import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserSlash,
} from '@fortawesome/free-solid-svg-icons';

import { deleteChar } from "../../store/characters";
import BlackBox from "../../global/BlackBox";

const Card = styled.li`
    margin: 1rem;

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

        div {
            flex-direction: row;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));

    // &:hover {
    //     filter: drop-shadow(0 0 5px rgba(212, 175, 55, .75));
    // }

    opacity: 1;
    // opacity: 0;
    transition: opacity 1s;

    .icon-holder {
        width: 5.5rem;
        height: 5.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

const Icon = styled.div`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    border-radius: 20rem;
    // filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));;
    background-color: ${props => props.color};
    font-family: 'Cormorant SC', serif;

    transition: all .15s;

    &:hover {
        width: 5.5rem;
        height: 5.5rem;
    }
`

const CharCard = ({ char, idx, ids }) => {

    const charLi = useRef(null);

    // useEffect(() => {
    //     const fadeIn = setTimeout(() => {
    //         charLi.current.style.opacity = 1;
    //     }, 250 * ((5 + idx) / 5));
    //     return () => clearTimeout(fadeIn);
    // }, [idx, ids])

    const dispatch = useDispatch();

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <Card key={idx} ref={charLi}>
            <Link to={`/roster/${char.id}`}>
                <div className="icon-holder">
                    <Icon className="roster-icon"
                        color={`rgb(${(char.str + char.con) * 5}, ${(char.dex + char.cha) * 5}, ${(char.int + char.wis) * 5})`}>
                        {char.name[0]}
                    </Icon>
                </div>
            </Link>
            <BlackBox>
                <div className="roster-info">
                    <div>
                        <p>{char.name}</p>
                        <form onSubmit={(e) => handleDelete(e, char.id)}>
                            <button type='submit'><FontAwesomeIcon icon={faUserSlash} /></button>
                        </form>
                    </div>
                    <p>Level {char.level} {char.class}</p>
                    <p>{char.race}</p>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
