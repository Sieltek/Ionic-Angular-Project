import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  email: string;
  pseudo: string;
  uid: string;

  listFriend: any[] = [];
  listUsers: Array<any> = [];
  promptUsers: Array<any> = [];

  user: {
    email: string,
    info : {},
    friends : boolean,
  }


  constructor(public toastController: ToastController,private LocalStorageService: LocalStorageService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.email = this.LocalStorageService.getEmail();
    this.uid = this.LocalStorageService.getUID();
  }

  ionViewDidEnter(){
    this.getFriends();
    this.promptUsers = this.listUsers;
  }

  getUser(){
    this.db.firestore.collection('User').get()
    .then((docs)=> {
      docs.forEach((doc) =>{
        if (doc.data().uid != this.uid){
        let isFriend = this.checkFriend(doc.id)
        this.user = {
            email : doc.id,
            info : doc.data(),
            friends : isFriend,
          }
          this.listUsers.push(this.user);
        }
      });
    });
  }

  checkFriend(email) :boolean{
    var index = this.listFriend.indexOf(email);
    if (email){
        if (index == -1){
          return false;
        }else{
          return true;
        }
    }else {
      return false;
    }
  }

  getFriends(){
    this.db.firestore.collection('User').doc(this.email).collection('Amis').get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.listFriend.push(doc.data().email)
      });
    this.checkFriend(this.listFriend);
    this.getUser();
    });
  }

  removeFriend(emailUser){
    this.db.collection('User').doc(this.email).collection('Amis').doc(emailUser).delete()
    .then(()=> {
      this.toastDelete();
    });
    
  }

  addFriend(uidUser, pseudoUser, emailUser){
    this.db.collection('User').doc(this.email).collection('Amis').doc(emailUser).set({
      'pseudo' : pseudoUser,
      'uid' : uidUser,
      'email': emailUser,
    })
    .then(()=> {
      this.toastAdd();
    });
  }
  async toastAdd() {
    const toast = await this.toastController.create({
      message: 'Vous avez bien ajouté l\'utilisateur à vos amis',
      position: 'top',
      color: 'success',
      duration: 2000
    });
    this.redirect();
    toast.present();
  }
  async toastDelete() {
    const toast = await this.toastController.create({
      message: 'Vous avez bien supprimé l\'utilisateur de vos amis',
      position: 'top',
      color: 'danger',
      duration: 2000
    });
    this.redirect();
    toast.present();
  }
  redirect(){
    this.router.navigateByUrl('/tabs/tab1');
  }

  triggerSearch(text){
    this.promptUsers = this.listUsers.filter((item)=>{
      return item.email.toLowerCase().indexOf(text.toLowerCase())>-1;
    });
  }
}
