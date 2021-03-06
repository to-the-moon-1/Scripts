import React from 'react';
import PropTypes from 'prop-types';

import './todo-item.css';

const ToDoItem = ({ text, isCompleted, removeTask, id, completeTask }) => (
  <li className="todo-item">
    <i
      className={
        isCompleted ? 'mark far fa-check-circle' : 'mark far fa-circle'
      }
      onClick={() => completeTask(id)}
    />
    <span className={isCompleted ? 'completed text' : 'text'}>{text}</span>
    <i className="fas fa-times" onClick={() => removeTask(id)} />
  </li>
);

ToDoItem.propTypes = {
  text: PropTypes.string,
  isCompleted: PropTypes.bool,
  removeTask: PropTypes.func,
  completeTask: PropTypes.func,
  id: PropTypes.number,
};

ToDoItem.defaultProps = {
  text: '',
  isCompleted: false,
  removeTask: () => {},
  completeTask: () => {},
  id: 0,
};

export default ToDoItem;
