import { Component } from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private LocalStorageService: LocalStorageService){ }

}
