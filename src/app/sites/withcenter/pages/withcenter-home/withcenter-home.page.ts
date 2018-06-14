import { Component, } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { getTexts, WITHCENTER_LANGUAGE_CODE } from '../../withenter-text';

// import { texts } from '../../text';
// import { FireService } from '../../../../modules/firelibrary/core';


import { Library as _ } from './../../../../etc/library';




@Component({
  selector: 'app-page-withcenter-home',
  templateUrl: 'withcenter-home.page.html',
  styleUrls: ['./withcenter-home.page.scss']
})
export class WithcenterHomePage {

  t;
  languageCode = 'en';
  animation = {
    index: 0,
    show: 'text-group-0'
  };
  dropdown = {};

  constructor(
    public a: AppService
    // public fire: FireService
  ) {
    this.languageCode = this.getLanguageCode();
    this.t = getTexts( this.languageCode );
    console.log(this.t);

    this.animateText();
  }

  getLanguageCode(): string {

    const ln = _.get( WITHCENTER_LANGUAGE_CODE );
    console.log('got ln: ', ln);
    if (ln) {
        return ln;
    } else {
        return _.getBrowserLanguage();
    }
  }

  animateText() {
    setInterval(() => {
      this.animation.index++;
      if (this.animation.index >= 3) {
        this.animation.index = 0;
      }
      this.animation.show = 'text-group-' + this.animation.index;
    }, 9000);
  }

  scrollIntoView(id: string) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }
  onClickHome() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  onChangeLanguageCode() {
    _.set( WITHCENTER_LANGUAGE_CODE, this.languageCode );
    // console.log('ln saved: ', _.get( WITHCENTER_LANGUAGE_CODE ) );
    document.location.reload(true);
  }
}


