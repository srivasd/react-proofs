import React, { Component } from 'react';
import './App.css';
import { OpenVidu, Session, Stream } from 'openvidu-browser';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.focusSessionId = this.focusSessionId.bind(this);
    this.focusSessionHeader = this.focusSessionHeader.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    this.focusSession = this.focusSession.bind(this);
    this.focusJoin = this.focusJoin.bind(this);
    this.OV = new OpenVidu();
    console.log(this.OV)
    this.sessionId="SessionA"
    this.session = this.OV.initSession("wss://" + window.location.hostname + ":8443/" + this.sessionId + '?secret=MY_SECRET');
    console.log(this.session)
  }

  handleSubmit(event){
    this.joinSession();
  }

  handleClick(){
    this.leaveSession();
  }

  focusSessionId() {
    this.sessionId.focus();
  }

  focusJoin(){
    this.joinSession.focus();
  }

  focusSession(){
    this.sessionElem.focus();
  }

  focusSessionHeader(){
    this.sessionHeader.focus();
  }

  joinSession() {

      this.session.on('streamCreated', function (event) {
        var subscriber = this.session.subscribe(event.stream, 'subscriber');
      });
    
      this.session.connect(null, function (error) {
    
        if (!error) {
          var publisher = this.OV.initPublisher('publisher');
          this.session.publish(publisher);
        } else {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
        
      });

      //document.getElementById('session-header').innerText = this.sessionId;     
      this.sessionHeader.innerHTML = this.sessionId.value;
      console.log(this.sessionId)
      
      //document.getElementById('join').style.display = 'none';
      this.join.style.display = 'none';
      
      //document.getElementById('session').style.display = 'block';
      this.sessionElem.style.display = 'block';
    
      return false;
    }
    
    leaveSession() {
    
      this.session.disconnect();

      //document.getElementById('join').style.display = 'block';
      this.join.style.display = 'block';
      
      //document.getElementById('session').style.display = 'none';
      this.sessionElem.style.display = 'none';
    }
    
    
    onbeforeunload = function () {
      this.session.disconnect()
    };

  render() {
    return (
      <div>
      <div id="join" ref={(input) => { this.join = input; }}>
        <h1> Join a video session </h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label> Session: </label>
            <input type="text" id="sessionId" ref={(input) => { this.sessionId = input; }} value="SessionA" required/>
          </p>
          <p>
            <input type="submit" value="JOIN"/>
          </p>
        </form>
      </div>

      <div id="session" ref={(input) => { this.sessionElem = input; }} style={{display: 'none'}}>
        <h1 id="session-header" ref={(input) => { this.sessionHeader = input; }}>Section Header</h1>
        <input type="button" onClick={this.handleClick} value="LEAVE"/>
        <div>
          <div id="publisher"><h3>YOU</h3></div>
          <div id="subscriber"><h3>OTHERS</h3></div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
