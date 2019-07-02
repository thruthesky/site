import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { XapiUserService } from '../../../../modules/xapi/xapi.module';
import { ModalData, ModalService } from '../../../../providers/modal/modal.service';

@Component({
  selector: 'katalkenglish-header',
  templateUrl: 'katalkenglish-header.component.html',
  styleUrls: ['katalkenglish-header.component.scss'],
})
export class KatalkEnglishHeaderComponent {

  selectedLanguage = '';
  isEdge = false;
  constructor(
    public a: AppService,
    public user: XapiUserService,
    public modal: ModalService
  ) {
    this.isEdge = a.isEdge();
    // console.log(`HeaderComponent:constructor()`);
    // console.log(`current: ${a.color}, change: red`);
    // a.setColor('red');
    this.selectedLanguage = this.a.language.getUserLanguage();
  }
  onClickLogout() {
    // this.a.fire.user.logout().then( () => {
      // this.user.logout();
    // // });
    // this.a.openHome();
    this.a.logout(true);
  }
  onChangeLanguage() {
    // if ( event && event.preventDefault !== void 0 ) {
    //   event.preventDefault();
    // }
    // console.log( this.selectedLanguage );
    this.a.language.setUserLanguage( this.selectedLanguage );
    // return false;
  }

  confirmContactAdmin(classSoftware) {
    const data: ModalData = {
      title: this.a.t('OPEN CLASS SOFTWARE', {'SOFTWARE': this.a.t( classSoftware.toUpperCase() )}),
      content: this.a.t('OPEN CLASS SOFTWARE CONFIRM', {'SOFTWARE': this.a.t( classSoftware.toUpperCase() )}),
      yes: this.a.t('YES'),
      no: this.a.t('NO')
    };
    this.modal.confirm(data).subscribe(result => {
      if ( result ) {
        this.a.onClickContactAdmin(classSoftware);
      } else {
        this.a.open('qna');
      }
    });
  }
}



