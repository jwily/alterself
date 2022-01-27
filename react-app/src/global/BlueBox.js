import styled from "styled-components";

export const BlueBox = styled.div`
    background: rgb(100,99,187);
    background: -moz-linear-gradient(160deg, rgba(100,99,187,1) 0%, rgba(49,49,131,1) 25%, rgba(8,8,80,1) 75%);
    background: -webkit-linear-gradient(160deg, rgba(100,99,187,1) 0%, rgba(49,49,131,1) 25%, rgba(8,8,80,1) 75%);
    background: linear-gradient(160deg, rgba(100,99,187,1) 0%, rgba(49,49,131,1) 25%, rgba(8,8,80,1) 75%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6463bb",endColorstr="#080850",GradientType=1);

    border: 2.5px solid silver;
    border-radius: .5rem;

    filter: drop-shadow(5px 5px 5px #000000);

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
    }

    button:active {
        background-color: rgba(51, 48, 47, 0.25);
    }

    button:hover {
        color: gold;
    }
`

export default BlueBox;
