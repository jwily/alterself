import styled, { css } from "styled-components";

const MeteorStyle = css`
    background: rgb(9,84,173);
    background: -moz-linear-gradient(120deg, rgba(9,84,173,1) 0%, rgba(6,40,137,1) 15%, rgba(5,13,71,1) 85%);
    background: -webkit-linear-gradient(120deg, rgba(9,84,173,1) 0%, rgba(6,40,137,1) 15%, rgba(5,13,71,1) 85%);
    background: linear-gradient(120deg, rgba(9,84,173,1) 0%, rgba(6,40,137,1) 15%, rgba(5,13,71,1) 85%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0954ad",endColorstr="#050d47",GradientType=1);

    border: 2.5px solid silver;
    border-radius: .5rem;
`

const LionStyle = css`
    background: rgb(60,60,60);
    background: -moz-linear-gradient(90deg, rgba(60,60,60,1) 0%, rgba(100,100,100,1) 50%);
    background: -webkit-linear-gradient(90deg, rgba(60,60,60,1) 0%, rgba(100,100,100,1) 50%);
    background: linear-gradient(90deg, rgba(60,60,60,1) 0%, rgba(100,100,100,1) 50%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3c3c3c",endColorstr="#646464",GradientType=1);

    border-top: 2.5px solid rgb(100, 100, 100);
    border-left: 2.5px solid rgb(100, 100, 100);
    border-bottom: 2.5px solid rgb(60, 60, 60);
    border-right: 2.5px solid rgb(60, 60, 60);
`

const DragonStyle = css`
    background: black;
    border: 2.5px solid silver;
    border-radius: .5rem;
`

const DefaultStyle = css`
    background: rgb(25, 25, 25);
    border: 2.5px solid rgb(25, 25, 25);
`

const BlueBox = styled.div`
    opacity: 0;
    transition: opacity .75s;

    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .75));

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
        color: #ffcd00;
    }

    ${(props) => props.theme === "default" && DefaultStyle}
    ${(props) => props.theme === "meteor" && MeteorStyle}
    ${(props) => props.theme === "dragon" && DragonStyle}
    ${(props) => props.theme === "lion" && LionStyle}
`

BlueBox.defaultProps = {
    theme: "default",
}

export default BlueBox;
