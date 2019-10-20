import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Logo = styled.Image`
  width: 41px;
  height: 42px;
  margin-bottom: 50px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin-top: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const SignLinkText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  font-weight: bold;
`;
