import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { ForumPostsComponentModule } from '../../../../components/forum-posts/forum-posts.component.module';
import { ForumService } from '../../../../providers/forum.service';
import { OntuePostViewPage } from './ontue-post-view.page';


const routes: Routes = [
    { path: '', component: OntuePostViewPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        ForumPostsComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntuePostViewPage
    ],
    entryComponents: [
        OntuePostViewPage
    ],
    providers: [
        ForumService
    ],
    bootstrap: [OntuePostViewPage],
    schemas: []
})
export class OntuePostViewPageModule { }
