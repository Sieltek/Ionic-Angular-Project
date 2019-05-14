import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage {

  prompterror: string = '';
  user: string = '';

  constructor(public toastController: ToastController, private router: Router) { }

  ngOnInit() {
   }

  login(form) {
    const email = form.value['email'];
    const pass = form.value['pass'];

    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then((success)=>{
      localStorage.setItem('uid', success.user.uid);
      localStorage.setItem('email', success.user.email);
      this.validate();
      this.redirect();
    })
    .catch((error)=>{
      this.prompterror = error.message;
    });

  }

  async validate() {
    const toast = await this.toastController.create({
      message: 'Vous vous êtes bien connecté !',
      position: 'top',
      color: 'success',
      duration: 2500
    });
    toast.present();
  }

  redirect(){
    this.router.navigateByUrl('/tabs/tab1');
  }
}
