import { Component, } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
// import { FireService } from '../../../../modules/firelibrary/core';


@Component({
  selector: 'app-page-withcenter-home',
  templateUrl: 'withcenter-home.page.html',
  styleUrls: ['./withcenter-home.page.scss']
})
export class WithcenterHomePage {

  animation = {
    index: 0,
    show: 'text-group-0'
  };
  constructor(
    public a: AppService,
    // public fire: FireService
  ) {

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
  }
  onClickHome() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}


