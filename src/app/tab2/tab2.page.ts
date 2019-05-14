import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  objet: {};
  constructor(private http: HttpClient) { 
    this.http.get('https://newsapi.org/v2/top-headlines?sources=google-news-fr&apiKey=10edc5183945436fbc3865e3ca1c9f9a')
    .subscribe((data)=>{
      this.objet = data;
    })
   }
}
