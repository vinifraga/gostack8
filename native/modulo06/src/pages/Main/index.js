import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Keyboard } from 'react-native';
import { Container, Input, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    users: [],
    newUser: '',
  };

  handleAddUser = async () => {
    const { newUser, users } = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({ users: [...users, data], newUser: '' });

    Keyboard.dismiss();
  };

  render() {
    const { newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
