import styled from "styled-components";

const BlueBox = styled.div`
    background: rgb(90,158,213);
    background: -moz-linear-gradient(160deg, rgba(90,158,213,1) 0%, rgba(26,88,162,1) 10%, rgba(7,21,45,1) 50%);
    background: -webkit-linear-gradient(160deg, rgba(90,158,213,1) 0%, rgba(26,88,162,1) 10%, rgba(7,21,45,1) 50%);
    background: linear-gradient(160deg, rgba(90,158,213,1) 0%, rgba(26,88,162,1) 10%, rgba(7,21,45,1) 50%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5a9ed5",endColorstr="#07152d",GradientType=1);

    border: 1px solid silver;
    border-radius: 1rem;

    width: 25rem;

    padding: 1rem;

    filter: drop-shadow(5px 5px 5px #000000);

    margin: 1rem;
`
export default BlueBox;
