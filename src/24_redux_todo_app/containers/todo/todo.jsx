import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  addTast,
  removeTask,
  completeTask,
  changeFilter,
} from '../../actions/actionCreator';

import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';

import './todo.css';
// import ToDoItem from '../../components/todo-item/todo-item';

class ToDo extends Component {
  state = {
    taskText: '',
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
    });
  };

  addTast = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length > 3 && key === 'Enter') {
      const { addTast } = this.props;
      addTast(new Date().getTime(), taskText, false);
      this.setState({
        taskText: '',
      });
    }
  };

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  getActiveTasksCounter = tasks =>
    tasks.filter(task => !task.isCompleted).length;

  render() {
    const { taskText } = this.state;
    const {
      tasks,
      removeTask,
      completeTask,
      filters,
      changeFilter,
    } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters);
    const taskCounter = this.getActiveTasksCounter(tasks);

    return (
      <div className="todo-wrapper">
        <ToDoInput
          onChange={this.handleInputChange}
          onKeyPress={this.addTast}
          value={taskText}
        />
        {isTasksExist && (
          <ToDoList
            completeTask={completeTask}
            removeTask={removeTask}
            tasksList={filteredTasks}
          />
        )}
        {isTasksExist && (
          <Footer
            activeFilter={filters}
            amount={taskCounter}
            changeFilter={changeFilter}
          />
        )}
      </div>
    );
  }
}

ToDo.propTypes = {
  addTast: PropTypes.func,
  tasks: PropTypes.array,
  removeTask: PropTypes.func,
  completeTask: PropTypes.func,
  filters: PropTypes.string,
  changeFilter: PropTypes.func,
};

ToDo.defaultProps = {
  addTast: () => {},
  tasks: [],
  removeTask: () => {},
  completeTask: () => {},
  filters: 'all',
  changeFilter: () => {},
};

export default connect(
  ({ tasks, filters }) => ({
    tasks,
    filters,
  }),
  { addTast, removeTask, completeTask, changeFilter },
)(ToDo);

//
