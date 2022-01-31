import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDAndD,
} from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 5rem;

    h1 {
        font-size: 5rem;
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));
        font-family: 'Cormorant SC', serif;
    }

    h2 {
        position: fixed;
        top: 5rem;
        font-size: 10rem;
        z-index: -1;
        color: rgb(186, 6, 22);
    }

    .welcome-title {
        display: flex;
        justify-content: center;
    }
`

const Welcome = () => {
    return (
        <Container>
            <div className="welcome-title">
                <h1>A L T E R S E L F</h1>
                <h2><FontAwesomeIcon icon={faDAndD} /></h2>
            </div>
            <div className="welcome-intro">

            </div>
        </Container>
    )
};

export default Welcome;
