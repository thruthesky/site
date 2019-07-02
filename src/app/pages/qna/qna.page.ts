import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ModalData, ModalService } from '../../providers/modal/modal.service';


@Component({
    selector: 'qna-page',
    templateUrl: 'qna.page.html',
    styleUrls: ['qna.page.scss'],
})
export class QnAPage implements OnInit {


    constructor(
        public a: AppService,
        public modal: ModalService
    ) {
        // console.log(`NotFoundPage::constructor()`);

    }

    ngOnInit() {

    }

    confirmContactAdmin(classSoftware: string) {
      const data: ModalData = {
        title: this.a.t('OPEN CLASS SOFTWARE', {'SOFTWARE': this.a.t( classSoftware.toUpperCase() ) }),
        content: this.a.t('OPEN CLASS SOFTWARE CONFIRM', {'SOFTWARE': this.a.t( classSoftware.toUpperCase() ) }),
        yes: this.a.t('YES'),
        no: this.a.t('CANCEL')
      };
      this.modal.confirm(data).subscribe(result => {
        if ( result ) {
          this.a.onClickContactAdmin(classSoftware);
        }
      });
    }

}
