import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';
import { XapiUserService } from '../../../../modules/xapi/xapi.module';

@Component({
  selector: 'katalkenglish-footer',
  templateUrl: 'katalkenglish-footer.component.html',
  styleUrls: ['katalkenglish-footer.component.scss'],
})
export class KatalkEnglishFooterComponent {

  constructor(
    public a: AppService,
    public f: FireService
  ) {
  }
}


