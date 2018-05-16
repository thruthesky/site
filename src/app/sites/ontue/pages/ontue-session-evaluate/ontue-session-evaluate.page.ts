import { Component } from '@angular/core';
import { AppService } from '../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'ontue-session-evaluate-page',
    templateUrl: 'ontue-session-evaluate.page.html',
    styleUrls: ['ontue-session-evaluate.page.scss']
})

export class OntueSessionEvaluatePage {


    idx;
    point: number;

    student_absent = false;
    unsuccessful = false;
    expression = 0;
    vocabulary = 0;
    grammar = 0;
    pronunciation = 0;
    speed = 0;
    comment: string;
    book_used: string;
    book_next: string;
    student_name: string;

    an = [];
    ob = {a: 1, b: 2};

    level = 0;

    loading = false;

    constructor(public a: AppService,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params && params.idx) {
                this.a.lms.get_session_evaluation(params.idx).subscribe(res => {
                    console.log('get_session_evaluation', res);
                    const session = res.session;
                    this.idx = session.idx;
                    this.student_name = session.student_name;
                    this.point = session.point;
                    if (session.student_absent === 'y') {
                        this.student_absent = true;
                    }
                    if (session.successful === 'n') {
                        this.unsuccessful = true;
                    }
                    this.expression = session.expression;
                    this.vocabulary = session.vocabulary;
                    this.grammar = session.grammar;
                    this.pronunciation = session.pronunciation;
                    this.speed = session.speed;
                    this.comment = session.comment;
                    this.book_used = session.book_used;
                    this.book_next = session.book_next;
                    this.onChangeChecklevel();
                }, e => {
                    this.a.toast(e);
                });
            }
        });
    }

    onClickSubmitEvaluation() {
        if (this.loading) {
            return;
        }

        const data = {};
        data['idx'] = this.idx;
        this.student_absent ? data['student_absent'] = 'y' : data['student_absent'] = 'n';

        if (this.student_absent || this.unsuccessful) {
            data['successful'] = 'n';
        } else {
            data['successful'] = 'y';
        }


        if (this.student_absent) {
            if (this.comment.length <= 2) {
                this.a.toast('You must comment even if the student was absent.');
                return;
            }
            if (this.comment.length < 10) {
                this.a.toast('You must comment more than 10 characters.');
                return;
            }
            data['comment'] = this.comment;
        } else {

            if (this.expression) {
                data['expression'] = this.expression;
            } else {
                this.a.toast('Please select the expression score on the session with the student');
                return;
            }
            if (this.vocabulary) {
                data['vocabulary'] = this.vocabulary;
            } else {
                this.a.toast('Please select the vocabulary score on the session with the student');
                return;
            }
            if (this.grammar) {
                data['grammar'] = this.grammar;
            } else {
                this.a.toast('Please select the grammar score on the session with the student');
                return;
            }
            if (this.pronunciation) {
                data['pronunciation'] = this.pronunciation;
            } else {
                this.a.toast('Please select the pronunciation score on the session with the student');
                return;
            }
            if (this.speed) {
                data['speed'] = this.speed;
            } else {
                this.a.toast('Please select the speed score on the session with the student');
                return;
            }
            if (this.comment && this.comment.length >= 50) {
                data['comment'] = this.comment;
            } else {
                this.a.toast('You must comment more than 50 characters.');
                return;
            }
            if (this.book_used) {
                data['book_used'] = this.book_used;
            } else {
                this.a.toast('Please specify book you uses for today session.');
                return;
            }
            if (this.book_next) {
                data['book_next'] = this.book_next;
            } else {
                this.a.toast('Please specify book you will use for next session.');
                return;
            }


        }

        this.loading = true;
        this.a.lms.session_evaluate(data).subscribe(res => {
            // console.log(res);
            this.a.toast('Evaluation Submitted!!!');
            this.a.open('session-past');
            this.a.onTeacherEvaluateSession();
            this.loading = false;
        }, e => {
            this.loading = false;
            this.a.toast(e);
        });
    }


    onChangeChecklevel() {
        if (this.expression && this.vocabulary && this.grammar && this.pronunciation && this.speed) {
            this.level = Math.floor(( this.a.toInt(this.expression) + this.a.toInt(this.vocabulary) + this.a.toInt(this.grammar) + this.a.toInt(this.pronunciation) + this.a.toInt(this.speed)  ) / 5);
        } else {
            this.level = 0;
        }
    }

}
