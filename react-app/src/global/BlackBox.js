import styled from "styled-components";

export const BlackBox = styled.div`

    // border: 2.5px solid silver;
    // border-radius: .5rem;

    // filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));;

    background: rgba(20, 20, 20, 1);

    font-family: 'Inconsolata', monospace;

    input, textarea {
        background-color: rgba(51, 48, 47, 0.25);
        border: 0;
        color: whitesmoke;
        padding: 0.5rem;
        font-family: 'Inconsolata', monospace;
    }

    button {
        width: fit-content;
        background-color: transparent;
        border: 0;
        color: whitesmoke;
        padding: .5rem;
        border-radius: .5rem;
        font-family: 'Inconsolata', monospace;
        cursor: pointer;
        font-size: .85rem;
    }

    button:active {
        background-color: rgba(51, 48, 47, 0.25);
    }

    button:hover {
        color: gold;
    }
`

export default BlackBox;
