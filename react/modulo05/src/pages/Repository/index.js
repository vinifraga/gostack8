import React, { Component } from 'react';

// import { Container } from './styles';
import api from '../../services/api';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      await api.get(`repos/${repoName}`),
      await api.get(`repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    return <h1>Repository:</h1>;
  }
}
