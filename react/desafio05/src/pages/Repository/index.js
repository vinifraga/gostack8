import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading, Owner, IssueList } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      {
        id: 1,
        name: 'all',
        text: 'All',
      },
      {
        id: 2,
        name: 'open',
        text: 'Open',
      },
      {
        id: 3,
        name: 'closed',
        text: 'Closed',
      },
    ],
    activeFilter: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const { activeFilter, filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      await api.get(`repos/${repoName}`),
      await api.get(`repos/${repoName}/issues`, {
        params: {
          state: filters[activeFilter - 1].name,
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

  handleFilter = async index => {
    const { filters, repository } = this.state;

    const issues = await api.get(`repos/${repository.full_name}/issues`, {
      params: {
        state: filters[index - 1].name,
        per_page: 5,
      },
    });

    this.setState({ activeFilter: index, issues: issues.data });
  };

  render() {
    const { repository, issues, loading, filters, activeFilter } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList activeFilter={activeFilter}>
          <ul>
            {filters.map(filter => (
              <li key={filter.id}>
                <button
                  type="button"
                  onClick={() => this.handleFilter(filter.id)}
                >
                  {filter.text}
                </button>
              </li>
            ))}
          </ul>
          {issues.map(issue => (
            <li className="issue" key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
