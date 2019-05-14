import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.page.html',
  styleUrls: ['./enregistrer.page.scss'],
})
export class EnregistrerPage{

  prompterror: string = '';
  user: string = '';

  constructor(public toastController: ToastController, private router: Router) { }

  ngOnInit() { }

  register(form) {
    const email = form.value['email'];
    const pass = form.value['pass'];
    const confpass = form.value['confpass'];
    if (pass == confpass){
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then((success)=>{
        localStorage.setItem('uid', success.user.uid);
        localStorage.setItem('email', success.user.email);
        this.validate();
        this.redirect();
      })
      .catch((error)=>{
        this.prompterror = error.message;
      });
      
      
    }else{
      this.prompterror = 'The password and confirm password does not correspond'
    }
  }

  async validate() {
    const toast = await this.toastController.create({
      message: 'Votre compte a bien été créé',
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
