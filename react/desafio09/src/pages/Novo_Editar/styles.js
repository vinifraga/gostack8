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
  width: 100%;
  max-width: 940px;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    input {
      width: 100%;
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

    textarea {
      width: 100%;
      margin-bottom: 10px;
      padding-left: 20px;
      padding-top: 20px;
      border: 0;
      border-radius: 4px;
      height: 200px;
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

    div.button {
      margin-top: 10px;
      button {
        display: flex;
        align-items: center;
        width: 162px;
        border: 0;
        border-radius: 4px;
        padding: 12px 25px 12px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background: #f94d6a;
        transition: background 0.2s;

        &:hover:not([disabled]) {
          background: ${darken(0.08, '#f94d6a')};
        }

        &:active:not([disabled]) {
          background: ${darken(0.18, '#f94d6a')};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        svg {
          margin-right: 10px;
          animation: ${props =>
            props.loading &&
            css`
              ${LoadingKeyframe} 2s linear 0s infinite
            `};
        }
      }
    }
  }
`;
