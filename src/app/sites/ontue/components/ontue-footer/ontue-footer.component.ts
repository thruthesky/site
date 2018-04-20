import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';

@Component({
  selector: 'ontue-footer',
  templateUrl: 'ontue-footer.component.html',
  styleUrls: ['ontue-footer.component.scss'],
})
export class OntueFooterComponent {

  constructor(
    public a: AppService
  ) {
  }
}



