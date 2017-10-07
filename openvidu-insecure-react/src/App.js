import React, { Component } from 'react';
import './App.css';
import { OpenVidu, Session, Stream } from 'openvidu-browser';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {valueSessionId: 'SessionA',
                  valueUserName: "Participant" + Math.floor(Math.random() * 100),
                  };
    this.focusSessionId = this.focusSessionId.bind(this);
    this.focusUserName = this.focusUserName.bind(this);
    this.focusSessionHeader = this.focusSessionHeader.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.focusSession = this.focusSession.bind(this);
    this.focusJoin = this.focusJoin.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.joinSession();
  }

  handleOnMouseUp(){
    this.leaveSession();
  }

  focusSessionId() {
    this.sessionId.focus();
  }

  focusUserName() {
    this.userName.focus();
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
      valueUserName : this.userName.value,
    });
  }

  handleChangeUserName(e){
    this.setState({
      valueSessionId : this.sessionId.value,
      valueUserName : e.target.value,
    });
  }

  joinSession() {

      this.OV = new OpenVidu();
      console.log(this.OV)
      
      this.session = this.OV.initSession("wss://" + window.location.hostname + ":8443/" + this.sessionId.value + '?secret=MY_SECRET');
      console.log(this.session)
      
      var that1 = this;
      
      this.session.on('streamCreated', function (event) {
        var subscriber = that1.session.subscribe(event.stream, 'video-container');

        subscriber.on('videoElementCreated', function(event) {
          that1.appendUserData(event.element, subscriber.stream.connection);
        });
      });
      
      var that = this;
      
      this.session.connect(null, '{"clientData": "' + this.userName.value + '"}', function (error) {
    
        if (!error) {
          var publisher = that.OV.initPublisher('video-container', {
            audio: true,
            video: true,
            quality: 'MEDIUM'
          });

          publisher.on('videoElementCreated', function (event) {
            that.initMainVideo(event.element, this.userName.value);
            that.appendUserData(event.element, this.userName.value);
            event.element['muted']  = true;
          });

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

      this.removeAllUserData();

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


    appendUserData(videoElement, connection) {
      var userData;
      var nodeId;
      if (typeof connection === "string") {
        userData = connection;
        nodeId = connection;
      } else {
        userData = JSON.parse(connection.data).clientData;
        nodeId = connection.connectionId;
      }
      var dataNode = document.createElement('div');
      dataNode.className = "data-node";
      dataNode.id = "data-" + nodeId;
      dataNode.innerHTML = "<p>" + userData + "</p>";
      videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
      this.addClickListener(videoElement, userData);
    }
    
    removeUserData(connection) {
      var dataNode = document.getElementById("data-" + connection.connectionId);
      dataNode.parentNode.removeChild(dataNode);
    }
    
    removeAllUserData() {
      var nicknameElements = document.getElementsByClassName('data-node');
      while (nicknameElements[0]) {
        nicknameElements[0].parentNode.removeChild(nicknameElements[0]);
      }
    }
    
    addClickListener(videoElement, userData) {
      videoElement.addEventListener('click', function () {
        var mainVideo = document.querySelector('#main-video video');
        var mainUserData = document.querySelector('#main-video p');
        if (mainVideo.src !== videoElement.src) {
          mainUserData.innerHTML = userData;
          mainVideo.src = videoElement.src;
        }
      });
    }
    
    initMainVideo(videoElement, userData) {
      document.querySelector('#main-video video').src = videoElement.src;
      document.querySelector('#main-video p').innerHTML = userData;
      document.querySelector('#main-video video')['muted'] = true;
    }



  render() {
    var valueSessionId = this.state.valueSessionId;
    var valueUserName = this.state.valueUserName;
    
    return (
      <div id="main-container" class="container">
        <div id="join" ref={(input) => { this.join = input; }}>
          <div id="img-div"><img src="resources/images/openvidu_grey_bg_transp_cropped.png" /></div>
          <div id="join-dialog" class="jumbotron vertical-center">
            <h1>Join a video session</h1>
            <form class="form-group" onSubmit={this.handleSubmit}>
              <p>
                <label>Participant</label>
                <input class="form-control" type="text" id="userName" ref={(input) => { this.userName = input; }} value={valueUserName} onChange={this.handleChangeUserName.bind(this)}required/>
              </p>
              <p>
                <label>Session</label>
                <input class="form-control" type="text" id="sessionId" ref={(input) => { this.sessionId = input; }} value={valueSessionId} onChange={this.handleChangeSessionId.bind(this)}required/>
              </p>
              <p class="text-center">
                <input class="btn btn-lg btn-success" type="submit" name="commit" value="Join!"/>
              </p>
            </form>
          </div>
        </div>

        <div id="session" ref={(input) => { this.sessionElem = input; }} style={{display: 'none'}}>
          <div id="session-header" ref={(input) => { this.sessionHeader = input; }}>
            <h1 id="session-title"></h1>
            <input class="btn btn-large btn-danger" type="button" id="buttonLeaveSession" onMouseUp={this.handleOnMouseUp} value="Leave session"/>
          </div>
          <div id="main-video" class="col-md-6"><p></p><video autoplay src=""></video></div>
			    <div id="video-container" class="col-md-6"></div>
        </div>
      </div>
    );
  }
}

export default App;
