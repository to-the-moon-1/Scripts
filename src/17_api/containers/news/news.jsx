import React, { Component } from 'react';

import Title from '../../components/title/title';
import NewsPost from '../../components/news/news';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import Pagination from '../../components/pagination/pagination';

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage=';
const PAGE_PARAM = 'page=';

const HITS = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 40,
    label: 40,
  },
  {
    value: 50,
    label: 50,
  },
];

class News extends Component {
  state = {
    searchQuery: '',
    result: {},
    hitsPerPage: 20,
    page: 0,
  };

  componentDidMount() {
    const { searchQuery, hitsPerPage, page } = this.state;
    this.fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
    fetch(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}
      &${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`,
    )
      .then(res => res.json())
      .then(result => this.setNews(result))
      .catch(error => error);
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  getSearch = ({ key }) => {
    if (key === 'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      this.setState({
        page: 0,
      });
      this.fetchData(searchQuery, hitsPerPage, 0);
    }
  };

  setNews = result => {
    this.setState({ result });
  };

  handleHitsChange = ({ target: { value } }) => {
    const { searchQuery, hitsPerPage } = this.state;

    this.setState(
      {
        hitsPerPage: +value,
        page: 0,
      },
      () => {
        this.fetchData(searchQuery, hitsPerPage, 0);
      },
    );
  };

  handlePageChange = ({ target }) => {
    const btnType = target.getAttribute('data-name');
    const { page } = this.state;

    if (!Number.isNaN(btnType)) {
      this.updatePage(+btnType);
    } else {
      switch (btnType) {
        case 'next':
          this.updatePage(page + 1);
          break;
        case 'prev':
          this.updatePage(page - 1);
          break;
        default:
      }
    }
  };

  updatePage = number => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState(
      {
        page: number,
      },
      () => {
        this.fetchData(searchQuery, hitsPerPage, number);
      },
    );
  };

  render() {
    const { searchQuery, result, hitsPerPage } = this.state;
    const { hits = [], page, nbPages } = result;

    return (
      <div className="wrapper">
        <Title title="Hacker News" />
        <Select
          handleChange={this.handleHitsChange}
          options={HITS}
          value={hitsPerPage}
        />
        <Pagination
          lastPage={nbPages}
          onClick={this.handlePageChange}
          page={page}
        />
        <Input
          onChange={this.handleInputChange}
          onKeyPress={this.getSearch}
          value={searchQuery}
        />
        <ul className="newsList">
          {hits.map(
            ({
              author,
              createdAt,
              numComments,
              objectID,
              title,
              points,
              url,
            }) => (
              <NewsPost
                key={objectID}
                author={author}
                createdAt={createdAt}
                numComments={numComments}
                points={points}
                title={title}
                url={url}
              />
            ),
          )}
        </ul>
      </div>
    );
  }
}

export default News;

//
