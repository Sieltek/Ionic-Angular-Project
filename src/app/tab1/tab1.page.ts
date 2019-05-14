import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  uid: string;
  email: string;
  constructor(private LocalStorageService: LocalStorageService){ }

  ngOnInit(){
  }

  ionViewDidEnter(){
    this.email = this.LocalStorageService.getEmail();
    this.uid = this.LocalStorageService.getUID();
  }

}
