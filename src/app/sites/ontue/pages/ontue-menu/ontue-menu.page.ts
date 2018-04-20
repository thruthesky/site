import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AppService } from '../../../../providers/app.service';
// import {TeacherPolicyComponent} from '../../components/teacher-policy/teacher-policy';
@Component({
  selector: 'ontue-menu-page',
  templateUrl: 'ontue-menu.page.html',
    styleUrls: ['ontue-menu.page.scss']
})

export class OntueMenuPage {

  // _modal = {
  //   teacherPolicy: TeacherPolicyComponent
  // };

  constructor(
    public a: AppService,
    // public modalCtrl: ModalController
  ) {


  }

  // ngOnInit() {
  //
  // }

  showModal(modal_name) {
    // const modal = this.modalCtrl.create( this._modal[modal_name] );
    // modal.onDidDismiss(()=> {});
    // modal.present();
  }

}
