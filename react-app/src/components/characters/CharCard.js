import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cursor from '../../images/FF8Cursor.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserSlash,
} from '@fortawesome/free-solid-svg-icons';

import { deleteChar, mountChar } from "../../store/characters";
import BlackBox from "../../global/BlackBox";
import EditCharModal from "./EditCharModal";

const Card = styled.li`

    margin: 1rem 1rem 1.25rem 1rem;

    .roster-edit-btn {
        margin-right: .25rem;
    }

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

    opacity: ${props => props.mounted ? 1 : 0};
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

const colorGen = (char) => {
    let red = (char.str + char.con) <= 40 ? (char.str + char.con) : 40;
    let green = (char.wis + char.cha) <= 40 ? (char.wis + char.cha) : 40;
    let blue = (char.int + char.dex) <= 40 ? (char.int + char.dex) : 40;
    return `rgb(${red * 4.5 + 20}, ${green * 4.5 + 20}, ${blue * 4.5 + 20})`
}

const CharCard = ({ char, idx, ids }) => {

    const charLi = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        let fadeIn;
        if (!char.mounted) {
            dispatch(mountChar(char.id))
            fadeIn = setTimeout(() => {
                charLi.current.style.opacity = 1;
                charLi.current.style.transition = 'opacity .75s'
            }, 100 + 50 * idx);
        };
        return () => clearTimeout(fadeIn);
    }, [idx, ids, char.id, char.mounted, dispatch])

    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteChar(id));
    }

    return (
        <Card key={idx} ref={charLi} mounted={char.mounted}>
            <Link to={`/roster/${char.id}`}>
                <div className="icon-holder">
                    <Icon className="roster-icon"
                        color={colorGen(char)}>
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
                        <div>
                            <EditCharModal char={char} idx={idx} />
                            <form onSubmit={(e) => handleDelete(e, char.id)}>
                                <button type='submit'><FontAwesomeIcon icon={faUserSlash} /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
