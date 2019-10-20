import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 20px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  justify-content: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
