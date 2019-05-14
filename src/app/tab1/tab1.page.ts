import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  uid: string;
  email: string;
  pseudo: string;

  constructor(private LocalStorageService: LocalStorageService, private db: AngularFirestore){ 
  }

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.email = this.LocalStorageService.getEmail();
    this.uid = this.LocalStorageService.getUID();
    this.db.firestore.collection('User').where('uid', '==', this.uid).get()
    .then((docs)=> {
      docs.forEach((doc)=> {
        this.pseudo = doc.data().pseudo;
      });
    });
  }

  update(){
    this.db.collection('User').doc(this.email).update({
      'pseudo' : 'polo',
    })
    .then(()=> {
      console.log('update');
    });
  }

  prompt(){
    this.db.firestore.collection('User').where('uid', '==', this.uid).get()
    .then((docs)=> {
      docs.forEach((doc)=> {
        this.pseudo = doc.data().pseudo;
      });
    });
  }

  delete(){
    this.db.collection('User').doc(this.email).delete()
    .then(()=> {
      console.log('delete');
    });
  }

  add(){
    this.db.collection('User').doc(this.email).set({
      'pseudo' : 'Anonyme',
      'uid' : this.uid,
    })
    .then(()=> {
      console.log('add');
    });
  }
}
