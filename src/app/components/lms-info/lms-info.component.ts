import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'lms-info-component',
  templateUrl: 'lms-info.component.html',
  styleUrls: ['lms-info.component.scss'],
})
export class LmsInfoComponent {
  constructor(
    public a: AppService
  ) {
  }
}

