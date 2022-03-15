import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cursor from '../../images/FF8Cursor.png';

import { mountChar } from "../../store/characters";
import BlackBox from "../../global/BlackBox";
import EditCharModal from "./EditCharModal";
import DeleteCharModal from "./DeleteCharModal";

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
        width: 6.5rem;
        height: 6.5rem;
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

const Portrait = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 5rem;
    // border: .5rem solid transparent;

    background-color: darkgrey;

    &:hover {
        width: 6.5rem;
        height: 6.5rem;
    }

    transition: all .15s;

    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center center;
    // background-image: url(${props => props.img});

    .cursor-img {
        position: absolute;
        top: 9.25rem;
        right: 15.25rem;
        opacity: 0;
        transition: opacity .15s;
        height: 1.5rem;
    }

    &:hover .cursor-img {
        opacity: 1;
    }
`

const Icon = styled.div`

    background-color: ${props => props.color};

    &:hover {
        width: 6.5rem;
        height: 6.5rem;
    }

    width: 6rem;
    height: 6rem;
    font-size: 2.5rem;
    border-radius: 5rem;
    font-family: 'Cormorant SC', serif;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all .15s;

    .cursor-img {
        position: absolute;
        top: 9.25rem;
        right: 15.25rem;
        opacity: 0;
        transition: opacity .15s;
        height: 1.5rem;
    }

    &:hover .cursor-img {
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
        return () => {
            clearTimeout(fadeIn)
        };
    }, [idx, ids, char.id, char.mounted, dispatch])

    return (
        <Card key={idx} ref={charLi} mounted={char.mounted}>
            <Link to={`/roster/${char.id}`}>
                <div className="icon-holder">
                    {!char.img ?
                        <Icon className="roster-icon"
                            color={colorGen(char)}
                            img={char.img}>
                            {char.name[0].toUpperCase()}
                            <img className="cursor-img" src={cursor} alt="cursor" />
                        </Icon> :
                        <Portrait>
                            {/* <img className="img-portrait" src={char.img} alt={`${char.name}'s portrait`} /> */}
                            <img className="cursor-img" src={cursor} alt="cursor" />
                        </Portrait>}
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
                            <DeleteCharModal char={char} />
                        </div>
                    </div>
                </div>
            </BlackBox>
        </Card >
    )
}

export default CharCard;
