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
      message: "NEW TODO"
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
    TodoActions.createTodo(this.state.message);
  }

  handleChange(e){
    this.setState({
      todos: TodoStore.getAll(),
      message: e.target.value,
    });
  }
  
  render() {
    const { todos } = this.state;
    var message = this.state.message;
    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <h1>Todos</h1>
        <button onClick={this.reloadTodos.bind(this)} class="btn btn-warning">Reload!</button>
        <br/>
        <ul>{TodoComponents}</ul>
        <input type="text" value={message} onChange={this.handleChange.bind(this)} />
        <br/>
        <br/>
        <button onClick={this.createTodo.bind(this)} class="btn btn-success">Create!</button>
      </div>
    );
  }
}
