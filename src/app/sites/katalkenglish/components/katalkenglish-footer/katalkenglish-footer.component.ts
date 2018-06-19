import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
// import { FireService } from '../../../../modules/firelibrary/core';
// import { XapiUserService } from '../../../../modules/xapi/xapi.module';


@Component({
  selector: 'katalkenglish-footer',
  templateUrl: 'katalkenglish-footer.component.html',
  styleUrls: ['katalkenglish-footer.component.scss'],
})
export class KatalkEnglishFooterComponent {

  year = (new Date).getFullYear();
  selectedLanguage = '';
  constructor(
    public a: AppService
  ) {
    this.selectedLanguage = this.a.language.getUserLanguage();
  }
  onChangeLanguage() {
    // console.log(this.selectedLanguage);
    this.a.language.setUserLanguage(this.selectedLanguage);
  }
}


