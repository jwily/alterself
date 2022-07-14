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
        background: rgb(48,50,78);
        background: -moz-linear-gradient(190deg, rgba(48,50,78,1) 0%, rgba(122,141,189,1) 100%);
        background: -webkit-linear-gradient(190deg, rgba(48,50,78,1) 0%, rgba(122,141,189,1) 100%);
        background: linear-gradient(190deg, rgba(48,50,78,1) 0%, rgba(122,141,189,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#30324e",endColorstr="#7a8dbd",GradientType=1);
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
