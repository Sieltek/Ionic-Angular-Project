import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() {
   }
   
  isConnected(): boolean{
    if (localStorage.getItem('uid'))
    {
      return true;
    } else {
      return false;
    }
  }

  getUID(): string{
    return localStorage.getItem('uid');
  }

  getEmail(): string{
    return localStorage.getItem('email');
  }

  getPseudo(): string{
    return;
  }

  signout(){
    localStorage.clear();
  }
}
