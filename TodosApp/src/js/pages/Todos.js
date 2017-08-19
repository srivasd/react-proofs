import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      message: "NEW TODO",
      description: "DESCRIPTION"
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  createTodo(){
    TodoActions.createTodo(this.state.message, this.state.description);
  }

  handleChange(e){
    this.setState({
      todos: TodoStore.getAll(),
      message: e.target.value,
    });
  }

  handleChangeDescription(e){
    this.setState({
      todos: TodoStore.getAll(),
      description: e.target.value
    });
  }
  
  render() {
    const { todos } = this.state;
    var message = this.state.message;
    var description = this.state.description;
    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <h1>ToDos  <span class='glyphicon glyphicon-tasks'></span></h1>
        <br/>
        <ul>{TodoComponents}</ul>
        <hr/>
        <p> <span class='glyphicon glyphicon-info-sign'> </span> ToDo title: </p><input type="text" value={message} onChange={this.handleChange.bind(this)} />
        <br/>
        <br/>
        <p> <span class='glyphicon glyphicon-list-alt'> </span> ToDo description:</p><textarea rows="5" cols="50" type="text" value={description} onChange={this.handleChangeDescription.bind(this)} />
        <br/>
        <br/>
        <button onClick={this.createTodo.bind(this)} class="btn btn-success">Create!  <span class='glyphicon glyphicon-ok-sign'></span></button> 
        <span>  </span>
        <button onClick={this.reloadTodos.bind(this)} class="btn btn-warning">Reload!  <span class='glyphicon glyphicon-refresh'></span></button>
      </div>
    );
  }
}
