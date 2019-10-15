import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { darken } from 'polished';
// import 'react-datepicker/dist/react-datepicker.css';

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

  body, input, button, textarea {
    font: 14px 'Roboto', sans-serif;
  }

  textarea {
    resize: none;
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

  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #47525d;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${darken(0.3, '#D44059')};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${darken(0.4, '#D44059')};
}
`;

export default GlobalStyles;
