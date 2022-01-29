import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cursor from '../../images/FF8Cursor.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserSlash,
} from '@fortawesome/free-solid-svg-icons';

import { deleteChar } from "../../store/characters";
import { mountChar } from "../../store/characters";
import BlackBox from "../../global/BlackBox";

const Card = styled.li`
    margin: 1rem 1rem 1.25rem 1rem;

    width: 16.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    .roster-info {
        padding: 1rem;
        width: 15rem;

        div {
            margin-top: .5rem;
            flex-direction: row;
            display: flex;
            align-items: start;
            justify-content: space-between;
        }
    }

    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));

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

    opacity: 0;
`

const Icon = styled.div`
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    border-radius: 20rem;
    background-color: ${props => props.color};
    font-family: 'Cormorant', serif;

    transition: all .15s;

    &:hover {
        width: 5.5rem;
        height: 5.5rem;
    }

    img {
        position: absolute;
        top: 8.25rem;
        right: 15.25rem;
        opacity: 0;
        transition: opacity .15s;
        height: 1.5rem;
    }

    &:hover img {
        opacity: 1;
    }
`

const CharCard = ({ char, idx, ids }) => {

    const charLi = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!char.mounted) {
            dispatch(mountChar(char.id))
            const fadeIn = setTimeout(() => {
                charLi.current.style.opacity = 1;
                charLi.current.style.transition = 'opacity .75s'
            }, 250 * ((5 + idx) / 5));
            return () => clearTimeout(fadeIn);
        } else {
            charLi.current.style.opacity = 1;
            charLi.current.style.transition = '';
        }
    }, [idx, ids, char.id, char.mounted, dispatch])

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <Card key={idx} ref={charLi}>
            <Link to={`/roster/${char.id}`}>
                <div className="icon-holder">
                    <Icon className="roster-icon"
                        color={`rgb(${(char.str + char.con) * 4.5 + 20}, ${(char.wis + char.cha) * 4.5 + 20}, ${(char.int + char.dex) * 4.5 + 20})`}>
                        {char.name[0].toUpperCase()}
                        <img src={cursor} alt="cursor" />
                    </Icon>
                </div>
            </Link>
            <BlackBox>
                <div className="roster-info">
                    <p>{char.name}</p>
                    <p>Level {char.level} {char.class}</p>
                    <p>{char.race} {char.background}</p>
                    <div>
                        <span>{char.title}</span>
                        <form onSubmit={(e) => handleDelete(e, char.id)}>
                            <button type='submit'><FontAwesomeIcon icon={faUserSlash} /></button>
                        </form>
                    </div>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
