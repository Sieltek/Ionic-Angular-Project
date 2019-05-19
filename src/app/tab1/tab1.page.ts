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
  listFriends: any[] = [];

  constructor(private LocalStorageService: LocalStorageService, private db: AngularFirestore){ 
  }

  ngOnInit(){
    this.email = this.LocalStorageService.getEmail();
    this.uid = this.LocalStorageService.getUID();
  }

  ionViewDidEnter(){
    this.listFriends = [];
    this.pseudo = this.LocalStorageService.getPseudo();
    this.getFriends();
  }

  getFriends(){
    this.db.firestore.collection('User').doc(this.email).collection('Amis').get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.listFriends.push(doc.data());
      });
    });
  }
}
