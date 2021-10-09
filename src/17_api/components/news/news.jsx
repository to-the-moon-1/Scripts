import React from 'react';
import PropTypes from 'prop-types';

import './news.css';

const NewsPost = ({ author, createdAt, numComments, title, points, url }) => (
  <li className="news">
    <div className="description">
      <a className="newsTitle" href={url}>
        {title}
      </a>
      <span className="text">{`${points} points`}</span>
      <span className="comments">{`${numComments} comments`}</span>
      <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      <span className="author">{author}</span>
    </div>
  </li>
);

NewsPost.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  numComments: PropTypes.number,
  title: PropTypes.string,
  points: PropTypes.number,
  url: PropTypes.string,
};

NewsPost.defaultProps = {
  author: '',
  numComments: 0,
  title: 'Here should be a title',
  points: 0,
  url: '#',
};

export default NewsPost;
