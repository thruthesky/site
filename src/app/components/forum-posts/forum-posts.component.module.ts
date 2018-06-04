import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ForumPostsComponent } from './forum-posts.component';


@NgModule({
    imports: [
        CommonModule,
        TranslatePipeModule,
        MaterialModule
    ],
    declarations: [
        ForumPostsComponent
    ],
    exports: [
        ForumPostsComponent
    ],
    schemas: []
})
export class ForumPostsComponentModule {
}
