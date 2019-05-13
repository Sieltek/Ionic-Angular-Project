import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyD669w7EBhJvjc4PaCq5QMJLQX6e_nP5o0",
      authDomain: "projet-ionic-b3f6a.firebaseapp.com",
      databaseURL: "https://projet-ionic-b3f6a.firebaseio.com",
      projectId: "projet-ionic-b3f6a",
      storageBucket: "projet-ionic-b3f6a.appspot.com",
      messagingSenderId: "159162334882",
      appId: "1:159162334882:web:cab6ed8bf2bc482a"
    };
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
