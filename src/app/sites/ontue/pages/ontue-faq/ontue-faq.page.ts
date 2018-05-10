import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-faq-page',
  templateUrl: 'ontue-faq.page.html',
    styleUrls: ['ontue-faq.page.scss']
})

export class OntueFAQPage {

  constructor(
    public a: AppService
  ) {


  }


}
