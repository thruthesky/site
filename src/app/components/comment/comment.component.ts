import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FireService, POST, COMMENT } from '../../modules/firelibrary/core';
import { AppService } from '../../providers/app.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy, OnChanges, DoCheck {


  @Input() post: POST = {};
  @Input() comment: COMMENT = {};
  editing = false;
  // form: COMMENT;
  loader = {
    progress: false
  };
  show = {
      replyForm: false
  };
  constructor(
    public fire: FireService,
    public readonly a: AppService
  ) {
    // console.log('>>>>> constructor() ::: ');
    // this.initComment();
  }


  // comments(id): COMMENT {
  //   return this.fire.comment.getComment(id);
  // }
  // get commentIds(): Array<string> {
  //   return this.fire.comment.commentIds[this.post.id];
  // }

  /**
   * Prepare `this.form` with an 'Temporary Comment ID` to crate.
   */
  initComment() {
    // this.form = { id: this.fire.comment.getId(), data: [] };
  }
  ngOnInit() {
    // console.log('>>>>> ngOnInit() ::: ');
    if (!this.post.id) {
      console.error('Post ID is empty. Something is wrong.');
      return;
    }
    // console.log("comment in init()", this.comment);
    setTimeout(() => {
      // console.log(this.comment);
      this.comment.date = (new Date(this.comment.created)).toLocaleTimeString();
    }, 1);

    // this.fire.comment.load(this.post.id).then(comments => {
    //   console.log(`comments: `, comments);
    // }).catch(e => alert(e.message));
  }
  ngOnDestroy() {
    // this.fire.comment.destory(this.post);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  ngDoCheck() {

  }

  myComment() {
    return this.comment.uid === this.fire.user.uid;
  }
  // /**
  //  * Creates or Updates a comment.
  //  * This is being invoked when user submits the comment form.
  //  *
  //  *
  //  * @param parentnId is the parent id. if it is not set, it would be undefined.
  //  */
  // onSubmit(event: Event) {
  //   console.log(`parentId: ${this.comment.parentId}`, 'form: ', this.form, 'comment:', this.comment);
  //   event.preventDefault();
  //   this.form.postId = this.post.id;
  //   this.form.parentId = this.comment.id;
  //   this.loader.progress = true;
  //   if (this.form.created) {
  //     this.fire.comment.edit(this.form).then(re => this.onSubmitThen(re)).catch(e => this.onSubmitCatch(e));
  //   } else {
  //     this.fire.comment.create(this.form).then(re => this.onSubmitThen(re)).catch(e => this.onSubmitCatch(e));
  //   }
  //   return false;
  // }
  // onSubmitThen(re) {
  //   this.initComment();
  //   this.loader.progress = false;
  // }
  // onSubmitCatch(e) {
  //   this.loader.progress = false;
  //   alert(e.message);
  // }


  /**
   * Sets the form to edit.
   */
  // onClickEdit() {
  //   this.form = this.comment;
  //   this.form.id = this.comment.id;
  //   this.form = this.comment;
  // }
  /**
   * Hide edit form and show comment.
   */
  onClickEditCancel() {
    // this.form = this.comment;
  }


  onClickDelete() {
    console.log('Going to delete: ', this.comment.id);
    this.fire.comment.delete(this.comment.id).then(re => {
      console.log('deleted: ', re.data.id);
    }).catch(e => alert(e.message));
  }

  onClickLike() {
    this.comment['likeInProgress'] = true;
    this.fire.comment.like(this.comment.id).then(re => {
      this.comment['likeInProgress'] = false;
    }).catch(e => alert(e.message));
  }
  onClickDislike() {
    this.comment['dislikeInProgress'] = true;
    this.fire.comment.dislike(this.comment.id).then(re => {
      this.comment['dislikeInProgress'] = false;
    })
      .catch(e => alert(e.message));
  }


  onClickReply() {
    if (this.a.isManager) {
      return true;
    } else {
      this.a.toast(this.a.t('MANAGER_PERMISSION_REQUIRED'));
      return false;
    }
  }
}
