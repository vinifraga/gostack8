import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Starred(props) {
  const { navigation } = props;
  const star = navigation.getParam('star');

  return (
    <Container>
      <WebView source={{ uri: star.html_url }} />
    </Container>
  );
}

Starred.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Starred.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('star').name,
});
