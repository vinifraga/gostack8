import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  height: 92px;
  width: 100%;
  margin-bottom: 50px;

  nav {
    width: 100%;
    max-width: 940px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 41px;
      height: 43px;
      padding: 5px;
      border-bottom: 1px solid transparent;
      transition: border-bottom 0.2s;

      &:hover {
        border-bottom: 1px solid #f94d6a;
      }
    }

    aside {
      display: flex;

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 30px;

        strong {
          color: #fff;
          margin-bottom: 5px;
        }

        a {
          color: #999;
          transition: color 0.2s;

          &:hover {
            color: ${lighten(0.25, '#999')};
          }
        }
      }

      button {
        padding: 12px 20px;
        text-align: center;
        vertical-align: center;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background: #d44059;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#d44059')};
        }

        &:active {
          background: ${darken(0.12, '#d44059')};
        }
      }
    }
  }
`;
