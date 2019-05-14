import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  objet: {};
  isReady: boolean;
  constructor(private http: HttpClient, public loadingController: LoadingController) { 
    this.getAPI();
   }

   getAPI(){
    this.presentLoading().then(()=>{
      this.http.get('https://newsapi.org/v2/top-headlines?sources=google-news-fr&apiKey=10edc5183945436fbc3865e3ca1c9f9a')
      .subscribe((data)=>{
        this.objet = data;
      });
    });
   }

   async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading data',
      duration: 1
    });
    await loading.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
