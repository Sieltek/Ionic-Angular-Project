import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {LocalStorageService} from '../services/local-storage.service'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pseudo',
  templateUrl: './change-pseudo.page.html',
  styleUrls: ['./change-pseudo.page.scss'],
})
export class ChangePseudoPage implements OnInit {

  email: string;
  uid: string;
  pseudo: string;

  constructor(private LocalStorageService: LocalStorageService, private db: AngularFirestore,public toastController: ToastController, private router: Router) { }

  prompterror: string;

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.email = this.LocalStorageService.getEmail();
    this.uid = this.LocalStorageService.getUID();
    this.pseudo = this.LocalStorageService.getPseudo();
  }

  changePseudo(form){
    const pseudo = form.value['pseudo'];
    this.db.collection('User').doc(this.email).update({
      'pseudo' : pseudo,
    })
    .then(()=> {
      localStorage.setItem('pseudo', pseudo);
      this.validate();
      this.redirect();
    })
    .catch((error)=>{
      this.prompterror = error.message;
    });
  }

  async validate() {
    const toast = await this.toastController.create({
      message: 'Votre pseudo a bien été modifé',
      position: 'top',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  redirect(){
    this.router.navigateByUrl('/tabs/tab1');
  }
}
