import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import { Container, Content, Text } from './styles';

export default function Info({ loading, contentText }) {
  return (
    <Container style={{ justifyContent: 'center', flex: 1 }}>
      <Content>
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
};

Info.defaultProps = {
  loading: false,
};
