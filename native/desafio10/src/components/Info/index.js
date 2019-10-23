import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { Container, Content, Text } from './styles';

export default function Info({ loading, contentText, onReload, button }) {
  return (
    <Container>
      <Content enabled={button} onPress={onReload}>
        {loading ? (
          <ActivityIndicator size={24} color="rgba(255, 255, 255, 0.6)" />
        ) : (
          <Icon
            name="emoticon-sad-outline"
            size={40}
            color="rgba(255, 255, 255, 0.6)"
          />
        )}
        <Text>{contentText}</Text>
      </Content>
    </Container>
  );
}

Info.propTypes = {
  loading: PropTypes.bool,
  contentText: PropTypes.string.isRequired,
  button: PropTypes.bool,
  onReload: PropTypes.func,
};

Info.defaultProps = {
  loading: false,
  button: false,
  onReload: null,
};
