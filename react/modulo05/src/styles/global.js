import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* Tira margins e seta box-sizing pra encolher caso tamanho seja fixo e adicione um padding, por exemplo */
  * {
    margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  }
/* Define que essas tags irão ocupar todo o espaço disponível, por padrão é só o content  */
  html, body, #root {
    min-height: 100%;
  }
/* Seta o background color e melhora a legibilidade das fontes, utilizado important pq as vezes os browsers tentar retirar */
  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
/* Seta o cursor pra mudar (estilo click) quando estiver sobre o botão */
  button {
    cursor: pointer;
  }

`;
