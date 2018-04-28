import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { ForumPage } from './forum.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataComponentModule } from '../../components/data/data.component.module';
import { CommentComponentModule } from '../../components/comment/comment.component.module';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';

const AppRoutes: Array<Route> = [
    { component: ForumPage, path: ''  }
];

@NgModule({
    declarations: [
        ForumPage
    ],
    entryComponents: [
        ForumPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( AppRoutes ),
        DataComponentModule,
        CommentComponentModule,
        TranslatePipeModule
    ],
    bootstrap: [
        ForumPage
    ]
})
export class ForumPageModule {}
