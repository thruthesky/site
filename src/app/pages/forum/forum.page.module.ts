import { NgModule } from '@angular/core';

import { ForumPage } from './forum.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    { path: '', component: ForumPage }
  ];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild( routes ),
        HttpClientModule
    ],
    exports: [],
    declarations: [
        ForumPage
    ],
    providers: [],
})
export class ForumPageModule { }

