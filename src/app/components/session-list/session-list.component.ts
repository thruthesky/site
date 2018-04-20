import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'session-list-component',
  templateUrl: 'session-list.component.html',
  styleUrls: ['session-list.component.scss'],
})
export class SessionListComponent {
  constructor(
    public a: AppService
  ) {

  }
}


