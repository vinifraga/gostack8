import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  margin-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  ul {
    display: flex;
    width: fit-content;
    list-style: none;
    border: 1px solid #eee;
    margin: 20px auto;

    li {
      button {
        font-size: 16px;
        font-weight: bold;
        color: #aaa;
        padding: 5px 10px;
        border: none;
        background: #fff;

        &:hover {
          color: #7159c1;
          cursor: pointer;
        }
      }

      &:nth-child(${props => props.activeFilter}) {
        button {
          color: #7159c1;
          background: rgba(113, 89, 193, 0.1);
        }
      }
    }
  }

  li.issue {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
