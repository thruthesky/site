import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';


@Component({
  selector: 'app-page-ontue-home',
  templateUrl: 'ontue-home.page.html',
  styleUrls: ['ontue-home.page.scss'],
})
export class OntueHomePage {
  constructor(
    public a: AppService,
    public fire: FireService
  ) {

  }
}


