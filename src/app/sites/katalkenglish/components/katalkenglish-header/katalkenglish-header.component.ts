import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';
import { XapiUserService } from '../../../../modules/xapi/xapi.module';

@Component({
  selector: 'katalkenglish-header',
  templateUrl: 'katalkenglish-header.component.html',
  styleUrls: ['katalkenglish-header.component.scss'],
})
export class KatalkEnglishHeaderComponent {
  constructor(
    public a: AppService,
    public fire: FireService,
    public user: XapiUserService
  ) {
    // console.log(`HeaderComponent:constructor()`);
    // console.log(`current: ${a.color}, change: red`);
    // a.setColor('red');
  }
  onClickLogout() {
    this.fire.user.logout().then( () => {
      this.user.logout();
    });
    this.a.openHome();
  }
}

