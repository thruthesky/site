import { Component, Input, OnInit, OnDestroy, NgZone, Output, EventEmitter } from '@angular/core';
import { FireService, POST, COMMENT } from '../../modules/firelibrary/core';
import { AppService } from '../../providers/app.service';



@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {

    @Input() post: POST = {};
    @Input() comment: COMMENT = {};
    @Output() created = new EventEmitter<string>();
    @Output() edited = new EventEmitter<string>();
    @Output() cancelled = new EventEmitter<void>();
    form: COMMENT;
    loader = {
        progress: false
    };
    percentage = 0;
    constructor(
        public ngZone: NgZone,
        public readonly a: AppService,
        public readonly fire: FireService
    ) {
        this.initComment();
    }
    ngOnInit() {
        if (!this.post.id) {
            console.error('Post ID is empty. Something is wrong.');
            return;
        }
    }

    ngOnDestroy() {

    }
    /**
     * Prepare `this.form` with an 'Temporary Comment ID` to crate.
     */
    initComment() {
        this.form = { id: this.fire.comment.getId(), data: [] };
    }

    /**
     * Creates or Updates a comment.
     * This is being invoked when user submits the comment form.
     *
     *
     * @param parentnId is the parent id. if it is not set, it would be undefined.
     */
    onSubmit(event: Event) {
        console.log(`parentId: ${this.comment.parentId}`, 'form: ', this.form, 'comment:', this.comment);
        event.preventDefault();
        if ( ! this.a.isManager ) {
            this.a.toast( this.a.t('ADMIN_PERMISSION_REQUIRED'));
            return false;
        }
        this.loader.progress = true;
        this.form.displayName = this.a.user.name;
        console.log('this.form: ', this.form);
        if (this.form.created) {
            this.fire.comment.edit(this.form).then(re => {
                this.onSubmitThen(re);
                this.edited.emit(re.data.id);
            }).catch(e => this.onSubmitCatch(e));
        } else {
            this.form.postId = this.post.id;
            this.form.parentId = this.comment.id;
            this.fire.comment.create(this.form).then(re => {
                this.onSubmitThen(re);
                this.created.emit(re.data.id);
            }).catch(e => this.onSubmitCatch(e));
        }
        return false;
    }
    onSubmitThen(re) {
        this.initComment();
        this.loader.progress = false;
    }
    onSubmitCatch(e) {
        this.loader.progress = false;
        alert(e.message);
    }
    edit() {
        /**
         * Pass by value.
         */
        this.form = Object.assign({}, this.comment);
    }

    onClickEditCancel() {
        // this.form = this.comment;
        this.cancelled.emit();
    }


    onUpload() {
        console.log('onUpload(): ', this.post.data);
    }
    onProgress(percentage) {
        this.percentage = percentage;
        this.ngZone.run(x => x);
        if (this.percentage === 100) {
            setTimeout(() => this.percentage = 0, 1000);
        }
    }
}


