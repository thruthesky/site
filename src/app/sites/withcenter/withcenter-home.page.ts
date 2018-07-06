import { Component, } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { WithcenterTextService } from './withcenter-text.service';



@Component({
  selector: 'app-page-withcenter-home',
  templateUrl: 'withcenter-home.page.html',
  styleUrls: ['withcenter-home.page.scss']
})
export class WithcenterHomePage {

  languageCode;
  animation = {
    index: 0,
    show: 'text-group-0'
  };
  showMobileMenu: boolean;

  constructor(
    public a: AppService,
    public t: WithcenterTextService
    // public fire: FireService
  ) {

    this.languageCode = t.getLanguageCode();
    // console.log('t: ', t.ln);

    this.animateText();
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
    return true;
  }
  onClickHome() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  onChangeLanguageCode() {
    this.t.setLanguageCode( this.languageCode );
    // console.log('ln saved: ', this.t.getLanguageCode() );
    setTimeout(() => document.location.reload(true), 200);
  }
}


