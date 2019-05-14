import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage {

  prompterror: string = '';

  constructor(public toastController: ToastController, private router: Router, private db: AngularFirestore,public loadingController: LoadingController) { }

  ngOnInit() {
   }

  login(form) {
    const email = form.value['email'];
    const pass = form.value['pass'];

    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then((success)=>{
      this.presentLoading().then(()=>{
      this.pushUserInLocalStorage(success.user.uid, success.user.email);
      this.validate();

      this.redirect();
      });
    })
    .catch((error)=>{
      this.prompterror = error.message;
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading data',
      duration: 1000
    });
    await loading.present();
  }
  
  async validate() {
    const toast = await this.toastController.create({
      message: 'Vous vous êtes bien connecté !',
      position: 'top',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  redirect(){
    this.router.navigateByUrl('/tabs/tab2');
  }

  pushUserInLocalStorage(uid, email){
    localStorage.setItem('uid', uid);
    localStorage.setItem('email', email);
    this.db.firestore.collection('User').where('uid', '==', uid).get()
    .then((docs)=> {
      docs.forEach((doc)=> {
        let pseudo = doc.data().pseudo;
        localStorage.setItem('pseudo', pseudo)
      });
    });
  }
}
