import React from "react";
import * as TodoActions from "../actions/TodoActions";
import { Link } from "react-router";

export default class Todo extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }

  doneUndone(){
    TodoActions.doneUndone(this.props.id);
  }

  deleteTodo(){
    TodoActions.deleteTodo(this.props.id);
  }

  render() {
    const { complete, edit, text } = this.props;
    console.log(this.props);
    const icon = complete ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      );
    }

    return (
      <li>
        <Link to={`favorites/${text}?id=${this.props.id}&completed=${complete}&description=${this.props.description}`}><span>{text}  </span></Link>
        <span class={icon} aria-hidden="true">   </span>
        <span>  </span>
        <button onClick={this.doneUndone.bind(this)} class='btn btn-primary'> (Un)Done  <span class='glyphicon glyphicon-erase'></span></button>
        <span>  </span>
        <button onClick={this.deleteTodo.bind(this)} class='btn btn-danger'> Delete ToDo  <span class='glyphicon glyphicon-remove-sign'></span></button>
        <br/>
        <br/>
      </li>
    );
  }
}
