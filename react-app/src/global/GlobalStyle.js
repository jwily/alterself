import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    html {
        min-height: 100%;
        background: rgb(31,39,60);
        background: -moz-linear-gradient(190deg, rgba(31,39,60,1) 0%, rgba(128,123,178,1) 100%);
        background: -webkit-linear-gradient(190deg, rgba(31,39,60,1) 0%, rgba(128,123,178,1) 100%);
        background: linear-gradient(190deg, rgba(31,39,60,1) 0%, rgba(128,123,178,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1f273c",endColorstr="#807bb2",GradientType=1);
    }

    body {
        font-family: 'Karla', sans-serif;
        color: whitesmoke;
    }


    a {
        color: whitesmoke;
        text-decoration: none;
    }

    h1, h2, h3 {
        font-size: 1rem;
        font-weight 400;
    }
`
export default GlobalStyle;
