import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service'
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  prompterror: string = '';
  email: string = this.LocalStorageService.getEmail();

  constructor(private LocalStorageService: LocalStorageService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  changePass() {
    if(this.email){
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(()=> {
        this.validate();
        this.redirect();
      });
    }else{
      this.prompterror = "Vous devez être connecté."
    }
    
  }

  async validate() {
    const toast = await this.toastController.create({
      message: 'Le mail a bien été envoyé à ' + this.email,
      position: 'top',
      color: 'success',
      duration: 2500
    });
    toast.present();
  }

  redirect(){
    this.router.navigateByUrl('/tabs/tab3');
  }
}
