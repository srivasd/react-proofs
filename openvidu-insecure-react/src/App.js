import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { OpenVidu, Session, Stream } from 'openvidu-browser';

class App extends Component {
  
  constructor(){
    super();
    //this.sessionId = document.getElementById("sessionId").value;
    this.sessionId = ReactDOM.findDOMNode(this.refs.sessionId).focus();
    this.OV = new OpenVidu();
    this.session = this.OV.initSession("wss://" + window.location.hostname + ":8443/" + this.sessionId + '?secret=MY_SECRET');
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
    
      document.getElementById('session-header').innerText = this.sessionId;
      document.getElementById('join').style.display = 'none';
      document.getElementById('session').style.display = 'block';
    
      return false;
    }
    
    leaveSession() {
    
      this.session.disconnect();
    
      document.getElementById('join').style.display = 'block';
      document.getElementById('session').style.display = 'none';
    }
    
    
    onbeforeunload = function () {
      this.session.disconnect()
    };

  render() {
    return (
      <div>
      <div id="join">
        <h1> Join a video session </h1>
        <form onsubmit="return joinSession()">
          <p>
            <label> Session: </label>
            <input type="text" id="sessionId" value="SessionA" required/>
          </p>
          <p>
            <input type="submit" value="JOIN"/>
          </p>
        </form>
      </div>

      <div id="session" style={{display: 'none'}}>
        <h1 id="session-header">Section Header</h1>
        <input type="button" onClick={this.leaveSession()} value="LEAVE"/>
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
