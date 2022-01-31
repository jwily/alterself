import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDAndD,
} from '@fortawesome/free-brands-svg-icons';

const WelcomePage = styled.div`

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dnd-logo {
        position: absolute;
        top: 7rem;
        font-size: 10rem;
        z-index: -1;
        color: rgb(186, 6, 22);
    }

    .welcome-title {
        padding: 7.5rem;
        width: 60rem;
    }

    .welcome-intro {
        background-color: rgb(25, 24, 23);
        width: 100%;
        padding: 2.5rem;
    }

    p {
        max-width: 45rem;
        font-size: 1rem;
        line-height: 1.5rem;
        margin-bottom: 1rem;
        font-size: 1.15rem;
        padding-left: 1rem;
    }

    .welcome-info {
        width: 100%;
        padding: 2.5rem;
    }

    h2 {
        font-size: 2rem;
        font-family: 'Cormorant SC', serif;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        margin-bottom: 2rem;
    }
`

const Welcome = () => {
    return (
        <WelcomePage>
            <div className="welcome-title">
                <h1>A L T E R S E L F</h1>
                <div className="dnd-logo"><FontAwesomeIcon icon={faDAndD} /></div>
            </div>
            <div className="welcome-intro">
                <h2>What is tabletop role-playing?</h2>
                <p>
                    It's a common childhood experience, regardless of where we each call home, to set alight the imagination and put ourselves in the shoes of another: a star athlete, a boundless caped crusader, or perhaps even our favorite character from one of Tolkien's timeless epics.
                </p>
                <p>
                    Tabletop role-playing takes this universal form of play and weaves into it a set of rules that determines everything from how high we might fly to the might of the dragons we vanquish in our dreams.
                </p>
                <p>
                    Now, on the surface, adding rules to make-believe might seem entirely like defeating the purpose.
                </p>
                <p>
                    However, when we reflect upon the relationship between creativity and limitation, we can that it's precisely the existence of such rules that would invite a group of dreamers, sitting together round a table, to bring all of their daring, cunning, and heart to bear in surmounting the obstacles placed before them.
                </p>
            </div>
            <div className="welcome-info">
                <h2>What is Alter Self?</h2>
                <p>

                </p>
            </div>
        </WelcomePage>
    )
};

export default Welcome;
