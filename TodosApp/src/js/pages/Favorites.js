import React from "react";

export default class Archives extends React.Component {
  constructor(props){
    super();
    console.log(props.route.path);
  }

  navigate(){
    this.props.history.replaceState(null, "/");
  }
  render() {
    const icon = this.props.location.query.completed==="true" ? "glyphicon glyphicon-ok" : "glyphicon glyphicon-remove"
    console.log(this.props.location);
    return (
      <div>
        <h1>Details ({this.props.params.todo})<span class='glyphicon glyphicon-file'> </span></h1>
        <h3> Id : {this.props.location.query.id} </h3>
        <h3> Completed : {this.props.location.query.completed} <span class={icon}></span></h3>
        <h3> Description : Bla bla bla </h3>
        <button class='btn btn-info' onClick={this.navigate.bind(this)}>Back <span class='glyphicon glyphicon-arrow-left'></span></button>
      </div>
    );
  }
}
