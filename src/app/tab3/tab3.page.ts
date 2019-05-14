import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {LocalStorageService} from '../services/local-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private LocalStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {

  }
  signOutUser() {
      firebase.auth().signOut()
      .catch((error)=>{
        console.log(error);
      });
      this.LocalStorageService.signout();
  }
}
