import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { FireService } from '../../../../modules/firelibrary/core';
import { Router } from '@angular/router';

@Component({
  selector: 'katalkenglish-install-page',
  templateUrl: 'katalkenglish-install.page.html',
  styleUrls: ['katalkenglish-install.page.scss'],
})
export class KatalkEnglishInstallPage implements OnInit {
  show = {
    loader: false,
    content: false,
    installed: false
  };
  constructor(
    public router: Router,
    public a: AppService,
    public fire: FireService
  ) {
    this.show.loader = true;

    fire.checkInstall().then(re => {
      this.show.loader = false;
      this.show.content = true;
      this.show.installed = re.data.installed;
    })
      .catch(e => {
        this.show.loader = false;
        alert(e.message);
      });
  }

  ngOnInit() {
    //
  }

  onSubmitInstall(event: Event) {
    event.preventDefault();
    console.log(`Going to set ${this.fire.user.email} as admin`);
    this.fire.install({ email: this.fire.user.email }).then(re => {
      console.log('install: ', re);
      this.fire.checkInstall()
        .then( result => this.show.installed = result.data.installed );
    })
      .catch(e => alert(e.message));
    return false;
  }
}




