import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
  selector: 'ontue-menu-page',
  templateUrl: 'ontue-menu.page.html',
    styleUrls: ['ontue-menu.page.scss']
})

export class OntueMenuPage {

  constructor(
    public a: AppService
  ) {


  }



}
