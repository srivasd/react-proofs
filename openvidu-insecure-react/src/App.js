import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
  }
  
  /*joinSession() {
  
    var sessionId = document.getElementById("sessionId").value;
  
    OV = new OpenVidu();
    session = OV.initSession("wss://" + location.hostname + ":8443/" + sessionId + '?secret=MY_SECRET');
  
    session.on('streamCreated', function (event) {
      var subscriber = session.subscribe(event.stream, 'subscriber');
    });
  
    session.connect(null, function (error) {
  
      if (!error) {
        var publisher = OV.initPublisher('publisher');
        session.publish(publisher);
      } else {
        console.log('There was an error connecting to the session:', error.code, error.message);
      }
      
    });
  
    document.getElementById('session-header').innerText = sessionId;
    document.getElementById('join').style.display = 'none';
    document.getElementById('session').style.display = 'block';
  
    return false;
  }
  
  leaveSession() {
  
    session.disconnect();
  
    document.getElementById('join').style.display = 'block';
    document.getElementById('session').style.display = 'none';
  }
  
  
  onbeforeunload = function () {
    session.disconnect()
  };*/

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

      <div id="session" style="display: none;">
        <h1 id="session-header"></h1>
        <input type="button" onClick="leaveSession()" value="LEAVE"/>
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
