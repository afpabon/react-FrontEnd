import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import Todos from '../collections';

const TodoListOriginal = ({ todos, onTodoClick }) => (
  <ul>
    {
      todos.map(todo => (
      <Todo key={todo._id} {...todo} onClick={() => onTodoClick(todo._id)} createdAt={todo.date.toString()} />
    ))}
  </ul>
)

const TodoList = createContainer(({ visibilityFilter, pageSkip }) => {
  const todoSub = Meteor.subscribe('getTodos', visibilityFilter, pageSkip);
  return {
    todoSubReady: todoSub.ready(),
    todos: Todos.find({}, {limit: 10}).fetch() || [],
  }
}, TodoListOriginal);

export default TodoList