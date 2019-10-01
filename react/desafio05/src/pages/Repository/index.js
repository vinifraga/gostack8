import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading, Owner, IssueList, Filter, PageButton } from './styles';
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
    page: 1,
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
          page: 1,
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
        page: 1,
      },
    });

    this.setState({ activeFilter: index, issues: issues.data, page: 1 });
  };

  handlePageChange = async next => {
    const { filters, activeFilter, repository, page } = this.state;

    const newPage = next ? page + 1 : page - 1;

    const issues = await api.get(`repos/${repository.full_name}/issues`, {
      params: {
        state: filters[activeFilter - 1].name,
        per_page: 5,
        page: newPage,
      },
    });

    this.setState({ issues: issues.data, page: newPage });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      activeFilter,
      page,
    } = this.state;

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

        <IssueList>
          <Filter activeFilter={activeFilter}>
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
          </Filter>
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
          {(page !== 1 || issues.length !== 0) && (
            <PageButton>
              {page !== 1 && (
                <button
                  type="button"
                  onClick={() => this.handlePageChange(false)}
                >
                  Voltar
                </button>
              )}
              {issues.length !== 0 && (
                <button
                  type="button"
                  onClick={() => this.handlePageChange(true)}
                >
                  Próximo
                </button>
              )}
            </PageButton>
          )}
        </IssueList>
      </Container>
    );
  }
}
