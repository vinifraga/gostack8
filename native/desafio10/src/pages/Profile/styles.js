import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  padding: 20px;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 100 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogOutButton = styled(Button).attrs({
  small: true,
})`
  margin-top: 15px;
`;

export const Separator = styled.View`
  margin: 20px 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
`;
