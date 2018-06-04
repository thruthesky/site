import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { ForumPostsComponentModule } from '../../../../components/forum-posts/forum-posts.component.module';
import { OntueHandbookPage } from './ontue-handbook.page';
import { ForumService } from '../../../../providers/forum.service';


const routes: Routes = [
    { path: '', component: OntueHandbookPage }
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
        OntueHandbookPage
    ],
    entryComponents: [
        OntueHandbookPage
    ],
    providers: [
        ForumService
    ],
    bootstrap: [OntueHandbookPage],
    schemas: []
})
export class OntueHandbookPageModule { }
