import React, { Component, Input, Output, DoCheck, EventEmitter } from 'react';
import '.StreamComponent.css';

import { Stream } from 'openvidu-browser';

export default class StreamComponent extends Component{

  constructor(props){
    super(props);
    var stream;
    var isMuted;
    var mainVideoStream = new EventEmitter();
    var videoSrc = '';
    var videSrcUnsafe = '';
    var sanitizer;
  }

  ngDoCheck() { // Detect any change in 'stream' property
  
    // If 'src' of Stream object has changed, 'videoSrc' value must be updated
    if (!(this.videSrcUnsafe === this.stream.getVideoSrc())) {
  
      // Angular mandatory URL sanitization
      this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(this.stream.getVideoSrc());
  
      // Auxiliary value to store the URL as a string for upcoming comparisons
      this.videSrcUnsafe = this.stream.getVideoSrc();
    }
  }
  
  getNicknameTag() { // Gets the nickName of the user
    return JSON.parse(this.stream.connection.data).clientData;
  }
  
  videoClicked() { // Triggers event for the parent component to update its view
    this.mainVideoStream.next(this.stream);
  }


  render() {
    return (
      <div className="streamcomponent">
        <video src="videoSrc" id="'native-video-' + this.stream.connection.connectionId + '_webcam'"
          click="this.videoClicked()" autoplay="true" muted="this.isMuted"></video>
        <div id="'data-' + this.stream.connection.connectionId"><p>{this.getNicknameTag()}</p></div>
      </div>
    )
  }
}
