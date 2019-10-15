import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 20px;
  height: 300px;
  max-width: 940px;
  width: 100%;

  label {
    height: 100%;
    width: 100%;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
    }

    div {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;

      strong {
        font-size: 20px;
        margin-top: 10px;
        color: rgba(255, 255, 255, 0.3);
      }
    }

    input {
      display: none;
    }
  }
`;
