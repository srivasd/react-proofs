import React, { Component } from 'react';
import './App.css';
import { OpenVidu, Session, Stream } from 'openvidu-browser';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {valueSessionId: 'SessionA'};
    this.focusSessionId = this.focusSessionId.bind(this);
    this.focusSessionHeader = this.focusSessionHeader.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    this.focusSession = this.focusSession.bind(this);
    this.focusJoin = this.focusJoin.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
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

  handleChangeSessionId(e){
    this.setState({
      valueSessionId : e.target.value,
    });
  }

  joinSession() {

      this.OV = new OpenVidu();
      console.log(this.OV)
      this.session = this.OV.initSession("wss://" + window.location.hostname + ":8443/" + this.sessionId.value + '?secret=MY_SECRET');
      console.log(this.session)
      var that1 = this;
      this.session.on('streamCreated', function (event) {
        var subscriber = that1.session.subscribe(event.stream, 'subscriber');
      });
      var that = this;
      this.session.connect(null, function (error) {
    
        if (!error) {
          var publisher = that.OV.initPublisher('publisher');
          that.session.publish(publisher);
          console.log('No error');
        } else {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
        
      });

      //document.getElementById('session-header').innerText = this.sessionId;     
      this.sessionHeader.innerText = this.sessionId.value;
      
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
    
    onbeforeunload(event) {
      this.session.disconnect()
    };

    componentDidMount(){
      window.addEventListener("beforeunload", this.onbeforeunload)
    }

    componentWillUnmount(){
      window.removeEventListener("beforeunload", this.onbeforeunload)
    }

  render() {
    var valueSessionId = this.state.valueSessionId;
    return (
      <div>
      <div id="join" ref={(input) => { this.join = input; }}>
        <h1> Join a video session </h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label> Session: </label>
            <input type="text" id="sessionId" ref={(input) => { this.sessionId = input; }} value={valueSessionId} onChange={this.handleChangeSessionId.bind(this)}required/>
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
