import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';


@Component({
  selector: 'ontue-policy-page',
  templateUrl: 'ontue-policy.page.html',
    styleUrls: ['ontue-policy.page.scss']
})

export class OntuePolicyPage {

  constructor(
    public a: AppService
  ) {


  }


}
