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

    body {
        background-color: rgb(51, 48, 47);
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
