import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  deleteTodo(myId) {
    for(var i = this.todos.length - 1; i >= 0; i--) {
      if(this.todos[i].id === myId) {
        this.todos.splice(i, 1);
      }
    }
    this.emit("change");
  }

  doneUndone(myId) {
    for(var i = this.todos.length - 1; i >= 0; i--) {
      if(this.todos[i].id === myId) {
        this.todos[i].complete = !this.todos[i].complete;
      }
    }
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  getTodo(myId){
    for(i = 0; i < this.todos.length; i++){
      if(this.todos[i].id === myId){
        return this.todos[i];
      }
    }
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }
      case "EDIT_TODO": {
        this.doneUndone(action.id);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
