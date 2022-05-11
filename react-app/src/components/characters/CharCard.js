import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cursor from '../../images/FF8Cursor.png';

import BlackBox from "../../global/BlackBox";
import EditCharModal from "./EditCharModal";
import DeleteCharModal from "./DeleteCharModal";

const Card = styled.li`

    margin: 0rem 1rem 2.5rem 1rem;

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

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    opacity: ${props => props.mounted ? 1 : 0};

    .roster-link {
        width: 6rem;
        height: 6rem;
        border-radius: 10rem;
        display: flex;
        align-items: center;
        margin-bottom: 1.75rem;
        transition: padding .15s;
    }

    .roster-link:hover {
        padding-bottom: .5rem;
    }
`

const Portrait = styled.img`

    width: 5.5rem;
    height: 5.5rem;
    border-radius: 10rem;
`

const Cursor = styled.img`
    position: absolute;
    top: 9rem;
    right: 15.25rem;
    opacity: ${props => props.hover ? 1 : 0};
    transition: opacity .15s;
    height: 1.5rem;
`

const Icon = styled.div`

    background-color: ${props => props.color};

    width: 6rem;
    height: 6rem;
    font-size: 2.5rem;
    border-radius: 10rem;
    font-family: 'Cormorant SC', serif;

    display: flex;
    align-items: center;
    justify-content: center;
`

const colorGen = (char) => {
    let red = (char.str + char.con) <= 40 ? (char.str + char.con) : 40;
    let green = (char.wis + char.cha) <= 40 ? (char.wis + char.cha) : 40;
    let blue = (char.int + char.dex) <= 40 ? (char.int + char.dex) : 40;
    return `rgb(${red * 4.5 + 20}, ${green * 4.5 + 20}, ${blue * 4.5 + 20})`
}

const CharCard = ({ char, idx }) => {

    const charLi = useRef(null);
    const dispatch = useDispatch();

    const [hover, setHover] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        let fadeIn;
        if (!mounted) {
            fadeIn = setTimeout(() => {
                charLi.current.style.opacity = 1;
                charLi.current.style.transition = 'opacity .75s'
                setMounted(true)
            }, 100 + 50 * idx);
        }
        return () => {
            clearTimeout(fadeIn)
        };
    }, [idx, dispatch, mounted])

    return (
        <Card key={idx} ref={charLi} mounted={mounted}>
            <Link to={`/roster/${char.id}`} className="roster-link"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <Icon className="roster-icon"
                    color={colorGen(char)}>
                    {!char.img ? char.name[0].toUpperCase() : <Portrait src={char.img} alt={`${char.name}'s portrait`} />}
                </Icon>
            </Link>
            <BlackBox>
                <Cursor src={cursor} alt="cursor" hover={hover} />
                <div className="roster-info">
                    <p>{char.name}</p>
                    <p>Level {char.level} {char.class}</p>
                    <p>{char.race} {char.background}</p>
                    <div>
                        <span>{char.title}</span>
                        <div>
                            <EditCharModal char={char} idx={idx} setMounted={setMounted} />
                            <DeleteCharModal char={char} />
                        </div>
                    </div>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
