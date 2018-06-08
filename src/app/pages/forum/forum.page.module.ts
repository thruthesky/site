import { NgModule } from '@angular/core';

import { ForumPage } from './forum.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';


const routes: Routes = [
    { path: '', component: ForumPage }
  ];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild( routes ),
        HttpClientModule,
        MaterialModule,
        ModalServiceModule
    ],
    exports: [
        ForumPage
    ],
    declarations: [
        ForumPage
    ],
    entryComponents: [
        ForumPage
    ],
    providers: [],
})
export class ForumPageModule { }

