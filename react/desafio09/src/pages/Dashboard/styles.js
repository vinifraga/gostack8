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

  div.info {
    border-radius: 4px;
    margin-top: 50px;
    background: rgba(0, 0, 0, 0.2);
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      padding-top: 10px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 2em;
      font-weight: bold;
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
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  h1 {
    font-size: 32px;
    color: #fff;
  }

  button {
    display: flex;
    align-items: center;
    width: 172px;
    border: 0;
    border-radius: 4px;
    padding: 11px 0 11px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: #f94d6a;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#f94d6a')};
    }

    &:active {
      background: ${darken(0.18, '#f94d6a')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const List = styled.ul`
  a li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 20px 20px 20px 30px;
    border: 0;
    border-radius: 4px;
    font-size: 18px;
    color: #fff;
    background: rgba(0, 0, 0, 0.2);
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    &:active {
      background: rgba(0, 0, 0, 0.4);
    }

    aside {
      display: flex;
      align-items: center;

      time {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 30px;
      }
    }
  }
`;
