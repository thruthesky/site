import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ForumPostViewComponent } from './forum-post-view.component';


@NgModule({
    imports: [
        CommonModule,
        TranslatePipeModule,
        MaterialModule
    ],
    declarations: [
        ForumPostViewComponent
    ],
    exports: [
        ForumPostViewComponent
    ],
    schemas: []
})
export class ForumPostViewComponentModule {
}
