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
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  h1 {
    font-size: 32px;
    color: #fff;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      padding: 10px 0 10px 20px;
      font-size: 16px;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      color: #fff;
      transition: background 0.2s;

      &.delete {
        background: #d44059;
        width: 138px;
      }

      &.delete:hover:not([disabled]) {
        background: ${darken(0.08, '#d44059')};
      }

      &.delete:active:not([disabled]) {
        background: ${darken(0.12, '#d44059')};
      }

      &.edit {
        background: #4dbaf9;
        margin-right: 15px;
        width: 116px;
      }

      &.edit:hover:not([disabled]) {
        background: ${darken(0.08, '#4dbaf9')};
      }

      &.edit:active:not([disabled]) {
        background: ${darken(0.12, '#4dbaf9')};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      svg {
        margin-right: 10px;
      }

      svg.loading {
        animation: ${props =>
          props.loading &&
          css`
            ${LoadingKeyframe} 2s linear 0s infinite
          `};
      }
    }
  }
`;

export const Info = styled.div`
  max-width: 940px;
  width: 100%;

  img {
    width: 940px;
    height: 300px;
    border-radius: 4px;
    margin-bottom: 25px;
  }

  div {
    display: flex;

    time,
    address {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);

      svg {
        margin-right: 10px;
      }
    }

    address {
      font-style: normal;
      margin-left: 30px;
    }
  }
`;

export const Description = styled.div`
  margin-bottom: 30px;
  font-size: 18px;
  color: #fff;
  white-space: pre-wrap;
`;
