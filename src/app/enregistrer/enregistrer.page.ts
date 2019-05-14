import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.page.html',
  styleUrls: ['./enregistrer.page.scss'],
})
export class EnregistrerPage{

  prompterror: string = '';
  user: string = '';

  constructor(public toastController: ToastController, private router: Router, private db: AngularFirestore) { }

  ngOnInit() { }

  register(form) {
    const email = form.value['email'];
    const pass = form.value['pass'];
    const confpass = form.value['confpass'];
    if (pass == confpass){
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then((success)=>{
        this.pushUserInDataBase(success.user.uid, success.user.email);
        this.pushUserInLocalStorage(success.user.uid, success.user.email);
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
      duration: 2000
    });
    toast.present();
  }

  pushUserInDataBase(uid, email){
    this.db.collection('User').doc(email).set({
      'pseudo' : 'Anonyme',
      'uid' : uid,
    });
  }

  pushUserInLocalStorage(uid, email){
    localStorage.setItem('uid', uid);
    localStorage.setItem('email', email);
    localStorage.setItem('pseudo', 'Anonyme');
  }
  
  redirect(){
    this.router.navigateByUrl('/tabs/tab2');
  }
}
