import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

export const LoadingKeyframe = keyframes`
  0% {
  }

  100% {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c, #402845);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    margin-bottom: 50px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
      padding-left: 20px;
      border: 0;
      border-radius: 4px;
      height: 50px;
      font-size: 18px;
      color: #fff;
      background: rgba(0, 0, 0, 0.2);

      &::placeholder {
        color: #979797;
        font-size: 18px;
      }
    }

    span {
      color: #e5556e;
      padding-bottom: 10px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
      margin-bottom: 20px;
      background: #e5556e;
      border: 0;
      border-radius: 4px;
      height: 50px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover:not([disabled]) {
        background: ${darken(0.08, '#e5556e')};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      svg {
        animation: ${props =>
          props.loading &&
          css`
            ${LoadingKeyframe} 2s linear 0s infinite
          `};
      }
    }
  }

  a {
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;
