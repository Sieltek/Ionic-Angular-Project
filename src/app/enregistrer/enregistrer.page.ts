import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.page.html',
  styleUrls: ['./enregistrer.page.scss'],
})
export class EnregistrerPage implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  register(form: NgForm) {
    console.log(form.value);
    const email = form.value['email'];
    const pass = form.value['pass'];
    const confpass = form.value['confpass'];
    console.log(email);
    console.log(pass);
    console.log(confpass);
    //firebase.auth().createUserWithEmailAndPassword(form.valueOf[0], form.valueOf[1])
    //.catch((error)=>{
    //  console.log(error);
    //});
  }

}
