
import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'katalkenglish-session-evaluation-page',
    templateUrl: 'katalkenglish-session-evaluation.page.html',
    styleUrls: ['katalkenglish-session-evaluation.page.scss']
})
export class KatalkEnglishSessionEvaluationPage {


    session;
    level;
    loading = true;

    constructor(
        public a: AppService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe(params => {
            if (params && params.idx) {
                this.a.lms.get_session_evaluation(params.idx).subscribe(res => {
                    // console.log("get_session_evaluation:: " , res.session);
                    const s = res.session;
                    this.session = s;
                    this.loading = false;
                    this.level = Math.floor(( this.a.toInt(s.expression) + this.a.toInt(s.vocabulary) + this.a.toInt(s.grammar) + this.a.toInt(s.pronunciation) + this.a.toInt(s.speed)  ) / 5);
                }, e => {
                    this.loading = false;
                    this.a.alert(e);
                });
            }
        });

    }
}

