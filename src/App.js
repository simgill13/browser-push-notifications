import React, { Component } from 'react';
import {Sim,Second,Alert,InputBanner} from 'testcomponentnpmpackage';
import Notification  from 'react-web-notification';
import PageVisibility from 'react-page-visibility';
import moment from 'moment'
import logo from './logo.svg';
import './App.css';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
      userOnScreen:true,
      seconds: 0,
      sendOne:false
    };
  }


  tick = (isVisible) => {
    console.log('isUserOnPage -->',isVisible)
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(this.state.userOnScreen), 1000);
  }

  componentDidUpdate(){
    let currentTime = moment().format('LTS');
    console.log(currentTime)

    if(this.state.userOnScreen) {
      return;
    }

    if(currentTime == '10:52:50 AM' && !this.state.sendOne) {

      const title = 'you are offscreen'
      const body = 'Hello'
      const tag = currentTime;
      const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
      
      const options = {
        tag: tag,
        body: body,
        icon: icon,
        lang: 'en',
        dir: 'ltr',
        // sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      }
      this.setState({
        title: title,
        options: options,
        sendOne:true
      });
    }
     
  }

  handlePermissionGranted = () => {
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
  }


  handlePermissionDenied = () => {
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }


  handleNotSupported = () => {
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick = (e, tag) => {
    console.log(e, 'Notification clicked tag:' + tag);
  }


  handleNotificationOnError = (e, tag) => {
    console.log(e, 'Notification error tag:' + tag);
  }


  handleNotificationOnClose = (e, tag) => {
    console.log(e, 'Notification closed tag:' + tag);
  }


  playSound = (filename) => {
    // document.getElementById('sound').play();
  }

  handleNotificationOnShow = (e, tag) => {
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  } 

  handleButtonClick = () => {
    if(this.state.ignore) {
      return;
  }

    const now = Date.now();
    const title = 'Click';
    const body = 'Hi from Sim'
    const tag = now;
    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
    
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: 'en',
      dir: 'ltr'
   }
    this.setState({
      title: title,
      options: options
    });
  }



  handleVisibilityChange = isVisible => {
    this.setState({ rotate: !isVisible });
    if(isVisible){
      this.setState({userOnScreen:true})
    }
    else{
      this.setState({userOnScreen:false})  
    }
}



  render() {

     const warningSample = {
      alertType: 'textDismiss',
      alertName: 'WarningBanner',
      message: 'I am a warning banner.',
   };

   const data = {
     contentType:'textDismiss',
     InputBannerType:'SuccessBanner',
     text:'custom ui input banner working on I.E',
     action:undefined,
     actionText:undefined
   }

    return (
      <div>
        <button onClick={(e) => this.handleButtonClick(e)}>Notif!</button>
        <div>Seconds: {this.state.seconds}</div>
        <audio id='sound' preload='auto'>
          <source src='./sound.mp3' type='audio/mpeg' />
          <source src='./sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='./sound.mp3' />
        </audio>

        <PageVisibility onChange={this.handleVisibilityChange}>
            <Notification
            ignore={this.state.ignore && this.state.title !== ''}
            notSupported={() => this.handleNotSupported()}
            onPermissionGranted={() => this.handlePermissionGranted()}
            onPermissionDenied={() => this.handlePermissionDenied()}
            onShow={(e,tag) => this.handleNotificationOnShow(e,tag)}
            onClick={(e,tag) => this.handleNotificationOnClick(e,tag)}
            onClose={(e,tag) => this.handleNotificationOnClose(e,tag)}
            onError={(e,tag) => this.handleNotificationOnError(e,tag)}
            timeout={5000}
            title={this.state.title}
        options={this.state.options}
      />
       </PageVisibility> 

       <Sim/>
       <Second/>  
       <InputBanner {...data}/>
        <div style={{marginTop:'70px'}}>
        <Alert data={warningSample}/>
          </div>
      
       
      </div>
    )
  }
};


export default App;
