import React, { Component } from 'react';
import './App.css';
import { OpenVidu, Session, Stream } from 'openvidu-browser';

class App extends Component {
  constructor(){
    super();
    this.OV = new OpenVidu();
    this.location.hostname = 'localhost';
    this.session = this.OV.initSession('wss://' + this.location.hostname + ':8443/' + this.sessionId + '?secret=MY_SECRET');;
  }

  removeAllUserData() {
    var nicknameElements = document.getElementsByClassName('data-node');
    while (nicknameElements[0]) {
      nicknameElements[0].parentNode.removeChild(nicknameElements[0]);
    }
  }

  leaveSession() {
    
      // --- 6) Leave the session by calling 'disconnect' method over the Session object ---
    
      this.session.disconnect();
    
      // Removing all HTML elements with the user's nicknames. 
      // HTML videos are automatically removed when leaving a Session
      this.removeAllUserData();
    
      // Back to 'Join session' page
      document.getElementById('join').style.display = 'block';
      document.getElementById('session').style.display = 'none';
  }

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
