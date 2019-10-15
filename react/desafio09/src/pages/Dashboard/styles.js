import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 940px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

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
  }

  ul {
    margin-top: 50px;

    a li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
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
  }
`;
