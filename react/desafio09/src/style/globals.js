import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  body, html, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
